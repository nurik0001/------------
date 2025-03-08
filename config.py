from typing import List
from os import getenv
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Bot token
BOT_TOKEN = getenv('BOT_TOKEN')

# Group chat ID for notifications
GROUP_CHAT_ID = -1002494756211  # ID группы для уведомлений

# MongoDB settings
MONGO_URI = getenv('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = 'queue_master'

# Authorized users
# Чтобы получить ID пользователя:
# 1. Напишите боту @userinfobot в Telegram
# 2. Скопируйте полученный ID
# 3. Добавьте ID в список ниже
AUTHORIZED_USERS: List[int] = [
    6872447110,  # Нұрдәулет
    147305690,   # Мейрамбек
    2143413008,  # Наурызбек
    946215758,   # Мақсат
    1169331626,  # Бейбіт
    # Добавьте ID остальных пользователей:
    # - Ғалым
]

# User order for duties
USERS_ORDER = [
    "Нұрдәулет",
    "Ғалым",
    "Наурызбек",
    "Мейрамбек",
    "Мақсат",
    "Бейбіт"
]

# Water duty order
WATER_ORDER = [
    "Ғалым",
    "Бейбіт",
    "Мақсат",
    "Мейрамбек",
    "Нұрдәулет",
    "Наурызбек"
]

# Collection names
COLLECTIONS = {
    'users': 'users',
    'duties': 'duties'
}

# Duty types
DUTY_TYPES = {
    'food': 'еда',
    'water': 'вода',
    'trash': 'мусор'
} 