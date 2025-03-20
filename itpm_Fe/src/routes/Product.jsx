import React, { useState } from 'react';
import { FaFilter, FaStar, FaArrowRight, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Footer from '../Components/Footer';
import Hero from '../assets/Images/Home/Group 276.png';

const Product = () => {
  const [priceRange, setPriceRange] = useState('all');
  const [brand, setBrand] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = [
    {
      id: 1,
      name: "MacBook Pro M3",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.8,
      specs: "M3 Chip, 16GB RAM, 512GB SSD",
      brand: "Apple"
    },
    {
      id: 2,
      name: "Dell XPS 15",
      price: 1799.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.6,
      specs: "Intel i7, 32GB RAM, 1TB SSD",
      brand: "Dell"
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      price: 1599.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.7,
      specs: "Intel i5, 16GB RAM, 256GB SSD",
      brand: "Lenovo"
    },
    {
      id: 4,
      name: "HP Spectre x360",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.5,
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      brand: "HP"
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.9,
      specs: "RTX 4080, 32GB RAM, 1TB SSD",
      brand: "ASUS"
    },
    {
      id: 6,
      name: "Razer Blade 15",
      price: 2299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.7,
      specs: "RTX 4070, 16GB RAM, 1TB SSD",
      brand: "Razer"
    },
    {
      id: 7,
      name: "MacBook Air M2",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.8,
      specs: "M2 Chip, 8GB RAM, 256GB SSD",
      brand: "Apple"
    },
    {
      id: 8,
      name: "Dell Alienware x17",
      price: 2799.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.9,
      specs: "RTX 4090, 32GB RAM, 2TB SSD",
      brand: "Dell"
    },
    {
      id: 9,
      name: "Lenovo Legion Pro 7",
      price: 2699.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.8,
      specs: "RTX 4080, 32GB RAM, 1TB SSD",
      brand: "Lenovo"
    },
    {
      id: 10,
      name: "HP Omen 17",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.6,
      specs: "RTX 4070, 16GB RAM, 1TB SSD",
      brand: "HP"
    },
    {
      id: 11,
      name: "ASUS TUF Gaming",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.5,
      specs: "RTX 4060, 16GB RAM, 512GB SSD",
      brand: "ASUS"
    },
    {
      id: 12,
      name: "Razer Blade 14",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.7,
      specs: "RTX 4070, 16GB RAM, 1TB SSD",
      brand: "Razer"
    },
    {
      id: 13,
      name: "MacBook Pro 16",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.9,
      specs: "M2 Pro, 32GB RAM, 1TB SSD",
      brand: "Apple"
    },
    {
      id: 14,
      name: "Dell G15",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.4,
      specs: "RTX 4060, 16GB RAM, 512GB SSD",
      brand: "Dell"
    },
    {
      id: 15,
      name: "Lenovo Yoga 9i",
      price: 1699.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.7,
      specs: "Intel i7, 16GB RAM, 1TB SSD",
      brand: "Lenovo"
    },
    {
      id: 16,
      name: "HP Envy 16",
      price: 1599.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.6,
      specs: "Intel i7, 16GB RAM, 1TB SSD",
      brand: "HP"
    },
    {
      id: 17,
      name: "ASUS ZenBook Pro",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
      rating: 4.7,
      specs: "Intel i9, 32GB RAM, 1TB SSD",
      brand: "ASUS"
    },
    {
      id: 18,
      name: "Razer Blade 17",
      price: 2999.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
      rating: 4.9,
      specs: "RTX 4090, 32GB RAM, 2TB SSD",
      brand: "Razer"
    }
  ];

  const filteredProducts = products.filter(product => {
    const priceMatch = priceRange === 'all' ? true :
      priceRange === 'under1000' ? product.price < 1000 :
      priceRange === '1000to2000' ? product.price >= 1000 && product.price <= 2000 :
      product.price > 2000;
    
    const brandMatch = brand === 'all' ? true : product.brand === brand;
    
    return priceMatch && brandMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-10 -top-10 -left-10 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -bottom-10 -right-10 animate-pulse delay-1000"></div>
          <div className="absolute w-48 h-48 bg-pink-500 rounded-full opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Our Product Collection
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our premium selection of laptops, carefully curated to meet your needs
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-900/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaFilter className="mr-2" />
                Filters
              </h2>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    All Prices
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="under1000"
                      checked={priceRange === 'under1000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    Under $1000
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="1000to2000"
                      checked={priceRange === '1000to2000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    $1000 - $2000
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="over2000"
                      checked={priceRange === 'over2000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    Over $2000
                  </label>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="all"
                      checked={brand === 'all'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    All Brands
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="Apple"
                      checked={brand === 'Apple'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    Apple
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="Dell"
                      checked={brand === 'Dell'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    Dell
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="Lenovo"
                      checked={brand === 'Lenovo'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    Lenovo
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="HP"
                      checked={brand === 'HP'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    HP
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="ASUS"
                      checked={brand === 'ASUS'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    ASUS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      value="Razer"
                      checked={brand === 'Razer'}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mr-2"
                    />
                    Razer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/50 transform hover:scale-105 transition-all duration-300 shadow-xl group"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {product.rating}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <span className="text-sm text-gray-400">{product.brand}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{product.specs}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-purple-400">
                        ${product.price}
                      </span>
                      <button className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center gap-2 text-sm hover:shadow-lg hover:shadow-purple-500/25">
                        <FaShoppingCart className="text-xs" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                  >
                    <FaChevronLeft />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        currentPage === index + 1
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-black/30 text-gray-300 hover:bg-purple-600/50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Results Count */}
                <div className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages} | Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Product;
