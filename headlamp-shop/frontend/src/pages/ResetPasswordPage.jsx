import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [resetError, setResetError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { resetPassword, error } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // Получаем токен из URL-параметров или из query-параметров
  useEffect(() => {
    const tokenFromParams = params.token;
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');
    
    if (tokenFromParams) {
      setToken(tokenFromParams);
    } else if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [params, location]);

  const validateForm = () => {
    const errors = {};
    
    if (!password) {
      errors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!token) {
      errors.token = 'Токен сброса пароля отсутствует или недействителен';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setSuccessMessage('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await resetPassword(token, password);
        setSuccessMessage('Пароль успешно изменен');
        
        // Очищаем форму
        setPassword('');
        setConfirmPassword('');
        
        // Перенаправляем на страницу входа через 3 секунды
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Пароль успешно изменен. Теперь вы можете войти с новым паролем.' } 
          });
        }, 3000);
      } catch (err) {
        setResetError(err.response?.data?.message || 'Ошибка при сбросе пароля');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Сброс пароля
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введите новый пароль
          </p>
        </div>
        
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
                <p className="text-sm text-green-700 mt-1">Перенаправление на страницу входа...</p>
              </div>
            </div>
          </div>
        )}
        
        {(resetError || error || formErrors.token) && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {resetError || error || formErrors.token}
                </p>
                {formErrors.token && (
                  <p className="text-sm text-red-700 mt-1">
                    Пожалуйста, убедитесь, что вы перешли по правильной ссылке из письма.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">Новый пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formErrors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Подтвердите пароль</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !!successMessage}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить новый пароль'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Вернуться на страницу входа
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 