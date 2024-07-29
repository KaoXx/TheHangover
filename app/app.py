from flask import Flask, render_template, jsonify, request
from roulette import spin_wheel, get_questions
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/roulette')
def roulette():
    return render_template('roulette.html')

@app.route('/spin', methods=['POST'])
def spin():
    result = spin_wheel()
    question = get_questions(result)
    return jsonify({'result': result, 'question': question})

if __name__ == '__main__':
    app.run(debug=True)
