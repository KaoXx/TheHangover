import random

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
        with open(f'questions/{category}.txt', 'r') as file:
            questions[category] = file.read().splitlines()

def spin_wheel():
    return random.choice(categories)

def get_questions(category):
    if questions[category]:
        return questions[category].pop(random.randint(0, len(questions[category]) - 1))
    else:
        return "No more questions in this category."

load_questions()
