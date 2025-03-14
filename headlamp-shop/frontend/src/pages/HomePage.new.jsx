import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Автоматически перенаправляем в админ-панель
  useEffect(() => {
    // Перенаправляем в админ-панель
    navigate('/admin');
  }, [navigate]);

  return (
    <div>
      {/* Контент главной страницы (не будет отображаться из-за перенаправления) */}
      <h1>Главная страница</h1>
    </div>
  );
};

export default HomePage; 