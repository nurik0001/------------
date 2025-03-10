import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from config import BOT_TOKEN, AUTHORIZED_USERS, DUTY_TYPES, USERS_ORDER, GROUP_CHAT_ID
from database import Database

# Initialize bot and database
bot = telebot.TeleBot(BOT_TOKEN)
db = Database()

def get_cooking_schedule(current_index: int) -> str:
    """Generate cooking schedule for the next 7 days"""
    schedule = "🍳 Тамақ дайындау кестесі:\n\n"
    total_users = len(USERS_ORDER)
    
    for i in range(7):
        next_index = (current_index + i) % total_users
        date = (datetime.now().date() + timedelta(days=i))
        day_name = date.strftime("%A")
        # Переводим названия дней на казахский
        day_translations = {
            "Monday": "Дүйсенбі",
            "Tuesday": "Сейсенбі",
            "Wednesday": "Сәрсенбі",
            "Thursday": "Бейсенбі",
            "Friday": "Жұма",
            "Saturday": "Сенбі",
            "Sunday": "Жексенбі"
        }
        day_name_kz = day_translations[day_name]
        date_str = date.strftime("%d.%m")
        schedule += f"📅 {day_name_kz} ({date_str}): {USERS_ORDER[next_index]}\n"
    
    return schedule

def create_keyboard() -> ReplyKeyboardMarkup:
    """Create main keyboard with buttons"""
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    
    # Кнопки действий (в одном ряду)
    keyboard.row(
        KeyboardButton("💧 Су әкелдім ✅"),
        KeyboardButton("🗑 Қоқыс шығардым ✅")
    )
    
    # Информационные кнопки (на всю ширину)
    keyboard.row(KeyboardButton("🍳 Бүгін тамақ кім?"))
    keyboard.row(KeyboardButton("📋 Кезек тізімі"))
    keyboard.row(KeyboardButton("📅 Тамақ кестесі"))
    
    return keyboard

def check_auth(func):
    """Decorator to check if user is authorized"""
    def wrapper(message, *args, **kwargs):
        user_id = message.from_user.id
        print(f"Received request from user ID: {user_id}")
        print(f"Authorized users: {AUTHORIZED_USERS}")
        if user_id not in AUTHORIZED_USERS:
            bot.send_message(message.chat.id, f"Извините, у вас нет доступа к этому боту. Ваш ID: {user_id}")
            return
        return func(message, *args, **kwargs)
    return wrapper

@bot.message_handler(commands=['start'])
@check_auth
def start_handler(message):
    """Handle /start command"""
    bot.send_message(
        message.chat.id,
        "Сәлем! Мен пәтердегі кезек кестесін басқаратын ботпын.\n"
        "Қолданылатын командалар:\n"
        "/тамақ - Бүгін кім тамақ жасайды\n"
        "/су - Кім су әкелуі керек\n"
        "/қоқыс - Кім қоқыс шығаруы керек\n"
        "/кезек - Барлық кезектерді көрсету\n"
        "/кесте - Тамақ кестесін көрсету\n"
        "/chatid - Показать ID текущего чата\n"
        "/көмек - Осы анықтаманы көрсету",
        reply_markup=create_keyboard()
    )

@bot.message_handler(commands=['chatid'])
def chatid_handler(message):
    """Handle /chatid command - shows current chat ID"""
    chat_id = message.chat.id
    chat_type = message.chat.type
    response = f"💡 Чат туралы ақпарат:\n\n"
    response += f"Чат ID: {chat_id}\n"
    response += f"Чат түрі: {chat_type}"
    bot.send_message(message.chat.id, response)

@bot.message_handler(commands=['көмек'])
@check_auth
def help_handler(message):
    """Handle /help command"""
    bot.send_message(
        message.chat.id,
        "Командалар тізімі:\n"
        "/тамақ - Бүгін кім тамақ жасайды\n"
        "/су - Кім су әкелуі керек\n"
        "/қоқыс - Кім қоқыс шығаруы керек\n"
        "/кезек - Барлық кезектерді көрсету\n"
        "/кесте - Тамақ кестесін көрсету\n\n"
        "Сондай-ақ, төмендегі батырмаларды қолдана аласыз."
    )

@bot.message_handler(commands=['кезек'])
@check_auth
def status_handler(message):
    """Handle /status command"""
    duties = db.get_all_duties()
    
    # Находим следующего после Нұрдәулет
    current_index = USERS_ORDER.index("Нұрдәулет")
    next_index = (current_index + 1) % len(USERS_ORDER)
    next_trash_user = USERS_ORDER[next_index]
    
    response = "📋 Қазіргі кезек:\n\n"
    response += f"🍳 Тамақ: {duties['food']['current']}\n   Келесі: {duties['food']['next']}\n\n"
    response += f"💧 Соңғы су әкелген: Ғалым\n   Келесі кезекте: Бейбіт\n\n"
    response += f"🗑 Соңғы қоқыс шығарған: Бейбіт\n   Келесі кезекте: {next_trash_user}"
    
    bot.send_message(message.chat.id, response)

@bot.message_handler(commands=['тамақ'])
@check_auth
def food_handler(message):
    """Handle /food command"""
    duty = db.get_current_duty('food')
    bot.send_message(
        message.chat.id,
        f"Бүгін тамақ жасайтын: {duty['current']}\n"
        f"Ертең тамақ жасайтын: {duty['next']}"
    )

@bot.message_handler(commands=['су'])
@check_auth
def water_handler(message):
    """Handle /water command"""
    duty = db.get_current_duty('water')
    bot.send_message(
        message.chat.id,
        f"Су әкелуі керек: {duty['current']}\n"
        f"Келесі кезекте: {duty['next']}"
    )

@bot.message_handler(commands=['қоқыс'])
@check_auth
def trash_handler(message):
    """Handle /trash command"""
    duty = db.get_current_duty('trash')
    bot.send_message(
        message.chat.id,
        f"Қоқыс шығаруы керек: {duty['current']}\n"
        f"Келесі кезекте: {duty['next']}"
    )

def notify_next_person(duty_type: str, next_name: str, current_name: str):
    """Send notification to the group chat about duty completion and next person"""
    try:
        if duty_type == 'water':
            notification = f"💧 {current_name} су әкелді!\nКелесі кезекте: {next_name}"
        else:  # trash
            notification = f"🗑 {current_name} қоқыс шығарды!\nКелесі кезекте: {next_name}"
        
        bot.send_message(GROUP_CHAT_ID, notification)
    except Exception as e:
        print(f"Failed to send notification: {e}")

@bot.message_handler(func=lambda message: message.text in [
    "💧 Су әкелдім ✅", 
    "🗑 Қоқыс шығардым ✅", 
    "📋 Кезек тізімі", 
    "📅 Тамақ кестесі",
    "🍳 Бүгін тамақ кім?"
])
@check_auth
def button_handler(message):
    """Handle button presses for checking duties"""
    if message.text == "💧 Су әкелдім ✅":
        try:
            current_user = USERS_ORDER[AUTHORIZED_USERS.index(message.from_user.id)]
            # Проверяем, что текущий пользователь Бейбіт (следующий после Ғалым)
            if current_user != "Бейбіт":
                bot.send_message(
                    message.chat.id,
                    f"❌ Қате: Қазір сіздің кезегіңіз емес!\n"
                    f"Су әкелу кезегі: Бейбіт"
                )
                return
                
            # Находим следующего в очереди после Бейбіт
            current_index = USERS_ORDER.index("Бейбіт")
            next_index = (current_index + 1) % len(USERS_ORDER)
            next_user = USERS_ORDER[next_index]
            
            new_duty = db.update_duty('water', message.from_user.id)
            bot.send_message(
                message.chat.id,
                f"✅ Рахмет!\n\n"
                f"💧 {current_user} су әкелді\n"
                f"Келесі кезекте: {next_user}"
            )
            # Notify next person
            # notify_next_person('water', next_user, current_user)
        except ValueError:
            bot.send_message(
                message.chat.id,
                "❌ Қате: сіздің ID-ңыз тіркелмеген. Әкімшіге хабарласыңыз."
            )
        
    elif message.text == "🗑 Қоқыс шығардым ✅":
        try:
            current_user = USERS_ORDER[AUTHORIZED_USERS.index(message.from_user.id)]
            # Проверяем, что текущий пользователь Нұрдәулет
            if current_user != "Нұрдәулет":
                bot.send_message(
                    message.chat.id,
                    f"❌ Қате: Қазір сіздің кезегіңіз емес!\n"
                    f"Қоқыс шығару кезегі: Нұрдәулет"
                )
                return
                
            # Находим следующего в очереди (Ғалым)
            current_index = USERS_ORDER.index("Нұрдәулет")
            next_index = (current_index + 1) % len(USERS_ORDER)
            next_user = USERS_ORDER[next_index]
            
            # Обновляем в базе следующего пользователя
            db.set_duty_index('trash', next_user)
            
            bot.send_message(
                message.chat.id,
                f"✅ Рахмет!\n\n"
                f"🗑 {current_user} қоқыс шығарды\n"
                f"Келесі кезекте: {next_user}"
            )
            # Notify next person
            # notify_next_person('trash', next_user, current_user)
        except ValueError:
            bot.send_message(
                message.chat.id,
                "❌ Қате: сіздің ID-ңыз тіркелмеген. Әкімшіге хабарласыңыз."
            )
        
    elif message.text == "🍳 Бүгін тамақ кім?":
        duty = db.get_current_duty('food')
        bot.send_message(
            message.chat.id,
            f"🍳 Бүгін тамақ жасайтын: {duty['current']}\n"
            f"Ертең тамақ жасайтын: {duty['next']}"
        )
    elif message.text == "📋 Кезек тізімі":
        duties = db.get_all_duties()
        
        # Получаем текущего пользователя для мусора из базы
        trash_duty = db.get_current_duty('trash')
        next_trash_user = trash_duty['current']
        
        response = "📋 Қазіргі кезек:\n\n"
        response += f"🍳 Тамақ: {duties['food']['current']}\n   Келесі: {duties['food']['next']}\n\n"
        response += f"💧 Соңғы су әкелген: Ғалым\n   Келесі кезекте: Бейбіт\n\n"
        response += f"🗑 Соңғы қоқыс шығарған: Нұрдәулет\n   Келесі кезекте: {next_trash_user}"
        
        bot.send_message(message.chat.id, response)
    elif message.text == "📅 Тамақ кестесі":
        duty = db.get_current_duty('food')
        current_index = USERS_ORDER.index(duty['current'])
        schedule = get_cooking_schedule(current_index)
        bot.send_message(message.chat.id, schedule)

@bot.message_handler(func=lambda message: message.text == "Су әкелдім")
@check_auth
def water_done_handler(message):
    """Handle water duty completion"""
    new_duty = db.update_duty('water', message.from_user.id)
    bot.send_message(
        message.chat.id,
        f"✅ Рахмет!\n\n"
        f"💧 Келесі су әкелетін: {new_duty['current']}\n"
        f"Келесі: {new_duty['next']}"
    )

@bot.message_handler(func=lambda message: message.text == "Қоқыс шығардым")
@check_auth
def trash_done_handler(message):
    """Handle trash duty completion"""
    new_duty = db.update_duty('trash', message.from_user.id)
    bot.send_message(
        message.chat.id,
        f"✅ Рахмет!\n\n"
        f"🗑 Келесі қоқыс шығаратын: {new_duty['current']}\n"
        f"Келесі: {new_duty['next']}"
    )

@bot.message_handler(commands=['кесте'])
@check_auth
def schedule_handler(message):
    """Handle /график command"""
    duty = db.get_current_duty('food')
    current_index = USERS_ORDER.index(duty['current'])
    schedule = get_cooking_schedule(current_index)
    bot.send_message(message.chat.id, schedule)

def update_food_duty():
    """Update food duty at midnight"""
    db.update_duty('food', None)

def send_cooking_notification():
    """Send notification to group chat about today's cook"""
    duty = db.get_current_duty('food')
    current_cook = duty['current']
    
    notification = f"Ескерту!\n\n🍳 Бүгін тамақ жасайтын: {current_cook}"
    
    try:
        bot.send_message(GROUP_CHAT_ID, notification)
    except Exception as e:
        print(f"Failed to send notification: {e}")

# Schedule food duty update and notifications
scheduler = BackgroundScheduler()
scheduler.add_job(update_food_duty, 'cron', hour=0, minute=0, timezone='Asia/Almaty')
scheduler.add_job(send_cooking_notification, 'cron', hour=16, minute=0, timezone='Asia/Almaty')
scheduler.start()

@bot.message_handler(commands=['fix_duties'])
def fix_duties_handler(message):
    """Fix current duties order"""
    if message.from_user.id not in AUTHORIZED_USERS:
        bot.reply_to(message, "⛔️ Сізде бұл командаға рұқсат жоқ")
        return

    # Устанавливаем Бейбіт текущим по воде (так как Ғалым последний принес)
    db.set_duty_index('water', "Бейбіт")
    # Устанавливаем Ғалым текущим по мусору (так как Бейбіт последний вынес)
    db.set_duty_index('trash', "Ғалым")
    
    duties = db.get_all_duties()
    response = "✅ Кезек жаңартылды:\n\n"
    response += f"💧 Соңғы су әкелген: Ғалым\n   Келесі кезекте: Бейбіт\n\n"
    response += f"🗑 Соңғы қоқыс шығарған: Бейбіт\n   Келесі кезекте: Ғалым\n"
    
    bot.reply_to(message, response)

@bot.message_handler(commands=['set_water'])
@check_auth
def set_water_handler(message):
    """Handle /set_water command to set current water duty person"""
    try:
        # Get the name from the message
        name = message.text.split()[1]
        # Update the water duty
        new_duty = db.set_duty_index('water', name)
        bot.send_message(
            message.chat.id,
            f"✅ Су әкелетін адам орнатылды:\n"
            f"💧 Қазіргі: {new_duty['current']}\n"
            f"Келесі: {new_duty['next']}"
        )
    except (IndexError, ValueError) as e:
        bot.send_message(
            message.chat.id,
            "❌ Қате: Команданы былай қолданыңыз:\n"
            "/set_water Аты"
        )

@bot.message_handler(commands=['set_food'])
@check_auth
def set_food_handler(message):
    """Handle /set_food command to set current food duty person"""
    try:
        # Get the name from the message
        name = message.text.split()[1]
        # Update the food duty
        new_duty = db.set_duty_index('food', name)
        bot.send_message(
            message.chat.id,
            f"✅ Тамақ жасайтын адам орнатылды:\n"
            f"🍳 Қазіргі: {new_duty['current']}\n"
            f"Келесі: {new_duty['next']}"
        )
    except (IndexError, ValueError) as e:
        bot.send_message(
            message.chat.id,
            "❌ Қате: Команданы былай қолданыңыз:\n"
            "/set_food Аты"
        )

@bot.message_handler(commands=['set_trash'])
@check_auth
def set_trash_handler(message):
    """Handle /set_trash command to set current trash duty person"""
    try:
        # Get the name from the message
        name = message.text.split()[1]
        # Update the trash duty
        new_duty = db.set_duty_index('trash', name)
        bot.send_message(
            message.chat.id,
            f"✅ Қоқыс шығаратын адам орнатылды:\n"
            f"🗑 Қазіргі: {new_duty['current']}\n"
            f"Келесі: {new_duty['next']}"
        )
    except (IndexError, ValueError) as e:
        bot.send_message(
            message.chat.id,
            "❌ Қате: Команданы былай қолданыңыз:\n"
            "/set_trash Аты"
        )

@bot.message_handler(func=lambda message: message.text == "📋 Кезек тізімі")
@check_auth
def queue_list_handler(message):
    """Handle queue list button press"""
    duties = db.get_all_duties()
    
    # Находим следующего после Нұрдәулет
    current_index = USERS_ORDER.index("Нұрдәулет")
    next_index = (current_index + 1) % len(USERS_ORDER)
    next_trash_user = USERS_ORDER[next_index]
    
    response = "📋 Қазіргі кезек:\n\n"
    response += f"🍳 Тамақ: {duties['food']['current']}\n   Келесі: {duties['food']['next']}\n\n"
    response += f"💧 Соңғы су әкелген: Ғалым\n   Келесі кезекте: Бейбіт\n\n"
    response += f"🗑 Соңғы қоқыс шығарған: Бейбіт\n   Келесі кезекте: {next_trash_user}"
    
    bot.send_message(message.chat.id, response)

# Start bot
if __name__ == '__main__':
    print("Bot started...")
    bot.infinity_polling() 