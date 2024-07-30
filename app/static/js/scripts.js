document.getElementById('spinButton').addEventListener('click', function() {
    fetch('/spin', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            const wheel = document.getElementById('wheel');
            const resultText = document.getElementById('resultText');
            const questionText = document.getElementById('questionText');
            
            // Reset result text
            resultText.innerText = '';
            questionText.innerText = '';

            // Random angle for spinning (e.g., between 5 and 10 full rotations)
            const spinAngle = Math.floor(Math.random() * 3600) + 1800;
            wheel.style.transition = 'transform 4s ease-out';
            wheel.style.transform = `rotate(${spinAngle}deg)`;

            setTimeout(() => {
                // Calculate the final angle
                const finalAngle = spinAngle % 360;
                
                // Determine the result based on the final angle
                const segmentAngle = 360 / 6; // 6 segmentos
                const segment = Math.floor((360 - finalAngle + segmentAngle / 2) / segmentAngle) % 6;
                
                // Mapping segments to categories
                const categories = ['shots', 'truth', 'coin', 'clothing', 'hot', 'dare'];
                const result = categories[segment];

                // Display the result
                resultText.innerText = `Resultado: ${result}`;

                // Fetch the question for the selected category
                fetch(`/get_question/${result}`)
                    .then(response => response.json())
                    .then(data => {
                        questionText.innerText = `Pregunta: ${data.question}`;
                    });

            }, 4000);  // Duration of the spinning animation
        });
});
