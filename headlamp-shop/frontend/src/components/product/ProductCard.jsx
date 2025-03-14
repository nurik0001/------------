import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  // Отображение в виде сетки (по умолчанию)
  if (viewMode === 'grid') {
    return (
      <div className="product-card card group relative">
        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="favorite-btn p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Product Link */}
        <Link to={`/product/${product.id}`} className="block">
          {/* Image */}
          <div className="product-image relative h-48 mb-4 overflow-hidden rounded-md">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discount > 0 && (
              <div className="discount-badge">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            {/* Category */}
            <div className="text-xs text-gray-500 mb-1">{product.category}</div>
            
            {/* Title */}
            <h3 className="text-base font-medium mb-2 line-clamp-2 h-12">{product.name}</h3>
            
            {/* Price */}
            <div className="flex items-center mb-3 price-tag">
              <span className="text-lg font-bold text-dark">{product.price.toLocaleString()} ₸</span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.oldPrice.toLocaleString()} ₸
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-3">
              {product.inStock ? (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">В наличии</span>
              ) : (
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Под заказ</span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          className="w-full btn btn-primary flex items-center justify-center"
          onClick={addToCart}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          В корзину
        </button>
      </div>
    );
  }

  // Отображение в виде списка
  return (
    <div className="product-card card group relative flex">
      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          className="favorite-btn p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="flex flex-1">
        {/* Image */}
        <div className="product-image relative w-40 h-40 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {product.discount > 0 && (
            <div className="discount-badge">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 ml-4 flex flex-col">
          {/* Category */}
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          
          {/* Title */}
          <h3 className="text-lg font-medium mb-2">{product.name}</h3>
          
          {/* Stock Status */}
          <div className="mb-2">
            {product.inStock ? (
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">В наличии</span>
            ) : (
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Под заказ</span>
            )}
          </div>
          
          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-center mb-3 price-tag">
              <span className="text-xl font-bold text-dark">{product.price.toLocaleString()} ₸</span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.oldPrice.toLocaleString()} ₸
                </span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button
              className="btn btn-primary flex items-center justify-center"
              onClick={addToCart}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              В корзину
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 