import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AboutPage = () => {
  // Преимущества компании
  const advantages = [
    'Только оригинальные запчасти и качественные аналоги',
    'Более 10 лет опыта в сфере автомобильной оптики',
    'Профессиональная консультация и подбор деталей',
    'Гарантия на все товары от 1 года',
    'Доставка по всей России и странам СНГ',
    'Собственный сервисный центр'
  ];

  // Команда компании
  const team = [
    {
      name: 'Александр Петров',
      position: 'Генеральный директор',
      photo: 'https://via.placeholder.com/150?text=AP',
      description: 'Основатель компании с 15-летним опытом в автомобильной индустрии'
    },
    {
      name: 'Елена Смирнова',
      position: 'Руководитель отдела продаж',
      photo: 'https://via.placeholder.com/150?text=ES',
      description: 'Эксперт по работе с клиентами и развитию дилерской сети'
    },
    {
      name: 'Дмитрий Иванов',
      position: 'Технический директор',
      photo: 'https://via.placeholder.com/150?text=DI',
      description: 'Специалист по ретрофиту и модернизации оптики с опытом более 8 лет'
    },
    {
      name: 'Ольга Козлова',
      position: 'Логист',
      photo: 'https://via.placeholder.com/150?text=OK',
      description: 'Отвечает за своевременную доставку товаров по всей России'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Главная</Link> / О компании
      </div>

      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-8 text-center">О компании HeadlampShop</h1>

      {/* Основная информация */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Ваш надежный партнер в мире автомобильной оптики</h2>
            <p className="text-gray-700 mb-4">
              Компания HeadlampShop специализируется на продаже и установке современной автомобильной оптики, 
              светодиодных и ксеноновых модулей, а также всех необходимых комплектующих для тюнинга и ремонта фар.
            </p>
            <p className="text-gray-700 mb-4">
              Мы начали свою деятельность в 2012 году как небольшой магазин автозапчастей, но быстро выросли 
              и сфокусировались на узкой специализации — автомобильной оптике высокого качества.
            </p>
            <p className="text-gray-700">
              Сегодня HeadlampShop — это команда профессионалов, собственный сервисный центр и широкий ассортимент 
              продукции от ведущих мировых производителей.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://via.placeholder.com/600x400?text=HeadlampShop+Office" 
              alt="Офис HeadlampShop" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Наша миссия */}
      <div className="bg-primary text-white rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Наша миссия</h2>
        <p className="text-xl text-center max-w-3xl mx-auto">
          Обеспечивать автовладельцев качественными и современными решениями для улучшения 
          видимости и безопасности на дороге, а также помогать создавать уникальный стиль автомобиля 
          с помощью инновационной оптики.
        </p>
      </div>

      {/* Преимущества */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
              <p className="text-gray-700">{advantage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* История компании */}
      <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">История компании</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 font-bold text-primary text-xl">2012</div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">Основание компании</h3>
              <p className="text-gray-700">
                Открытие первого магазина автозапчастей с небольшим отделом автомобильной оптики.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 font-bold text-primary text-xl">2015</div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">Специализация на оптике</h3>
              <p className="text-gray-700">
                Полный переход на специализацию в области автомобильной оптики. Открытие первого сервисного центра.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 font-bold text-primary text-xl">2018</div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">Расширение ассортимента</h3>
              <p className="text-gray-700">
                Начало сотрудничества с ведущими мировыми производителями. Значительное расширение ассортимента продукции.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 font-bold text-primary text-xl">2020</div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">Запуск онлайн-магазина</h3>
              <p className="text-gray-700">
                Создание современной онлайн-платформы для удобного выбора и заказа автомобильной оптики.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 font-bold text-primary text-xl">2023</div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">Сегодняшний день</h3>
              <p className="text-gray-700">
                HeadlampShop — один из лидеров рынка автомобильной оптики с представительствами в крупнейших городах России.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Наша команда */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Наша команда</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary mb-2">{member.position}</p>
                <p className="text-gray-700 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Готовы сотрудничать с нами?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Если у вас есть вопросы о наших продуктах или услугах, или вы хотите стать нашим партнером,
          свяжитесь с нами прямо сейчас!
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/contacts" className="btn btn-primary">
            Связаться с нами
          </Link>
          <Link to="/catalog" className="btn btn-outline">
            Перейти в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 