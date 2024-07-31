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
            backgroundColor: "#6C4C6C", // Use an array of colors for each section
            data: [1, 1, 1, 1, 1, 1],
            borderColor: "#FFFFFF", // Borde de color blanco
            borderWidth: 4 // Ancho del borde
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

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            let resultText;
            switch (i.value) {
                case 1:
                    resultText = "reto";
                    break;
                case 2:
                    resultText = "verdad";
                    break;
                case 3:
                    resultText = "trago";
                    break;
                case 4:
                    resultText = "prenda";
                    break;
                case 5:
                    resultText = "moneda";
                    break;
                case 6:
                    resultText = "hot";
                    break;
            }
            finalValue.innerHTML = `<p>Resultado: ${resultText}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Spinning the wheel. Good luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
