import random
import os

categories = ['truth', 'dare', 'coin', 'hot', 'clothing', 'shots']

questions = {
    'truth': [],
    'dare': [],
    'coin': [],
    'hot': [],
    'clothing': [],
    'shots': []
}

def load_questions():
    for category in categories:
        file_path = os.path.join('questions', f'{category}.txt')
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                questions[category] = file.read().splitlines()

def spin_wheel():
    return random.choice(categories)

def get_question(category):
    if questions[category]:
        return questions[category].pop(random.randint(0, len(questions[category]) - 1))
    else:
        return "No more questions in this category."

load_questions()
