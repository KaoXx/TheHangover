document.getElementById('spinButton').addEventListener('click', function() {
    fetch('/spin', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultText').innerText = `Resultado: ${data.result}`;
            document.getElementById('questionText').innerText = `Pregunta: ${data.question}`;
            // Aquí puedes añadir la lógica para animar la ruleta
        });
});
