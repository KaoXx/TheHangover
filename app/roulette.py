import random
import os

categories = ['Verdad', 'Reto', 'Moneda', 'Hot', 'Prenda', 'Shots']

questions = {
    'Verdad': [],
    'Reto': [],
    'Moneda': [],
    'Hot': [],
    'Prenda': [],
    'Shots': []
}

def load_questions():
    categories = ['Shots', 'Verdad', 'Moneda', 'Prenda', 'Hot', 'Reto']
    questions = {}
    for category in categories:
        with open(f'questions/{category}.txt', 'r', encoding='utf-8') as file:
            questions[category] = [line.strip() for line in file.readlines()]
    return questions


def spin_wheel():
    return random.choice(categories)

def get_question(category):
    if questions[category]:
        return questions[category].pop(random.randint(0, len(questions[category]) - 1))
    else:
        return "No more questions in this category."

load_questions()