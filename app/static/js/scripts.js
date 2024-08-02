const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("center-image");
const finalValue = document.getElementById("final-value");

const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    }
    return colors;
};

let pieColors = generateColors(6);

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["👹", "😇", "🍺", "👙", "🪙", "🔥"],
        datasets: [{
            backgroundColor: "#6C4C6C",
            data: [1, 1, 1, 1, 1, 1],
            borderColor: "#FFFFFF",
            borderWidth: 4
        }],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 100 },
                anchor: 'end',
                align: 'start',
                offset: 30,
            },
        },
    },
});

const valueGenerator = async (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            let category;
            switch (i.value) {
                case 1:
                    category = "Reto";
                    break;
                case 2:
                    category = "Verdad";
                    break;
                case 3:
                    category = "Shots";
                    break;
                case 4:
                    category = "Prenda";
                    break;
                case 5:
                    category = "Moneda";
                    break;
                case 6:
                    category = "Hot";
                    break;
            }
            finalValue.innerHTML = `<p>Resultado: ${category}</p>`;

            // Fetch question from the server
            try {
                const response = await fetch(`/get_question/${category}`);
                const data = await response.json();
                finalValue.innerHTML = `<p>Categoria: ${category}<br>Resultado: ${data.question}</p>`;
            } catch (error) {
                finalValue.innerHTML = `<p>Error fetching question</p>`;
            }

            spinBtn.disabled = false;
            break;
        }
    }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Girando la ruleta. Buena suerte!</p>`;
    let randomDegree = Math.floor(Math.random() * 360);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = (myChart.options.rotation || 0) + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && (myChart.options.rotation || 0) >= randomDegree) {
            clearInterval(rotationInterval);
            valueGenerator(randomDegree);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
