import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Адреса магазинов
  const locations = [
    {
      id: 1,
      city: 'Москва',
      address: 'ул. Автомобильная, 42',
      phone: '+7 (495) 123-45-67',
      email: 'moscow@headlampshop.ru',
      hours: 'Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00'
    },
    {
      id: 2,
      city: 'Санкт-Петербург',
      address: 'пр. Светотехнический, 15',
      phone: '+7 (812) 765-43-21',
      email: 'spb@headlampshop.ru',
      hours: 'Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00'
    },
    {
      id: 3,
      city: 'Екатеринбург',
      address: 'ул. Тюнинговая, 78',
      phone: '+7 (343) 987-65-43',
      email: 'ekb@headlampshop.ru',
      hours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-17:00, Вс: выходной'
    }
  ];

  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при вводе
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Валидация формы
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Пожалуйста, введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Пожалуйста, введите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Пожалуйста, введите сообщение';
    }
    
    return errors;
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Очистка формы после успешной отправки
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setSubmitSuccess(true);
      
      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErrors({
        submit: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Главная</Link> / Контакты
      </div>

      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-8 text-center">Контакты</h1>

      {/* Основная информация */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
            <PhoneIcon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Телефон</h3>
            <p className="text-gray-700">+7 (800) 555-35-35</p>
            <p className="text-gray-700">+7 (495) 123-45-67</p>
          </div>
          
          <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
            <EnvelopeIcon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-700">info@headlampshop.ru</p>
            <p className="text-gray-700">sales@headlampshop.ru</p>
          </div>
          
          <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
            <ClockIcon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Время работы</h3>
            <p className="text-gray-700">Пн-Пт: 9:00 - 20:00</p>
            <p className="text-gray-700">Сб-Вс: 10:00 - 18:00</p>
          </div>
        </div>
      </div>

      {/* Карта и форма обратной связи */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Карта */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Мы на карте</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
            {/* Здесь будет карта, например Google Maps или Яндекс.Карты */}
            <div className="text-center p-4">
              <MapPinIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-gray-700">
                Здесь будет встроенная карта с расположением магазинов HeadlampShop
              </p>
            </div>
          </div>
        </div>
        
        {/* Форма обратной связи */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Напишите нам</h2>
          
          {submitSuccess ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
              Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              {formErrors.submit && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                  {formErrors.submit}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input w-full ${formErrors.name ? 'border-red-500' : ''}`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input w-full ${formErrors.email ? 'border-red-500' : ''}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Тема</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="">Выберите тему обращения</option>
                  <option value="order">Вопрос по заказу</option>
                  <option value="product">Вопрос по товару</option>
                  <option value="partnership">Сотрудничество</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Сообщение *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`input w-full ${formErrors.message ? 'border-red-500' : ''}`}
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Наши магазины */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Наши магазины</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map(location => (
            <div key={location.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-3 text-primary">{location.city}</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{location.address}</p>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{location.phone}</p>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{location.email}</p>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{location.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="bg-gray-50 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Дополнительная информация</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <BuildingOfficeIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Для оптовых клиентов</h3>
            <p className="text-gray-700 mb-3">
              Специальные условия для оптовых заказов и дилеров
            </p>
            <Link to="/wholesale" className="text-primary hover:underline">
              Подробнее
            </Link>
          </div>
          
          <div className="text-center">
            <TruckIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Доставка</h3>
            <p className="text-gray-700 mb-3">
              Информация о способах и стоимости доставки
            </p>
            <Link to="/delivery" className="text-primary hover:underline">
              Подробнее
            </Link>
          </div>
          
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Техническая поддержка</h3>
            <p className="text-gray-700 mb-3">
              Ответы на часто задаваемые вопросы
            </p>
            <Link to="/faq" className="text-primary hover:underline">
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage; 