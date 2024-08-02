from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

def load_questions():
    categories = ['Shots', 'Verdad', 'Moneda', 'Prenda', 'Hot', 'Reto']
    questions = {}
    for category in categories:
        with open(f'questions/{category}.txt', 'r', encoding='utf-8') as file:
            questions[category] = [line.strip() for line in file.readlines()]
    return questions

questions = load_questions()

@app.route('/')
def index():
    return render_template('roulette.html')

@app.route('/spin', methods=['POST'])
def spin():
    return jsonify({'status': 'success'})

@app.route('/get_question/<category>', methods=['GET'])
def get_question(category):
    if category in questions and questions[category]:
        question = random.choice(questions[category])
        questions[category].remove(question)
        return jsonify({'question': question})
    else:
        return jsonify({'question': 'No hay más preguntas en esta categoría.'})

if __name__ == '__main__':
    app.run(debug=True)
