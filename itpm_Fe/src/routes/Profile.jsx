import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaComments, FaCog, FaEdit, FaTrash, FaSave, FaTimes, FaCamera, FaUpload, FaSignOutAlt, FaDownload, FaSpinner } from 'react-icons/fa';
import Footer from '../Components/Footer';
import ProfileCover from '../../src/assets/Images/Home/Hero.jpg'
import OrderHistory from '../Components/OrderHistory';
import { useSearchParams } from 'react-router-dom';
// Add Space Grotesk font import
const spaceGrotesk = {
  fontFamily: "'Space Grotesk', sans-serif",
};

const Profile = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop');
  const [coverImage, setCoverImage] = useState(ProfileCover);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    shippingAddress: '123 Main St, City, Country',
    billingAddress: '123 Main St, City, Country',
    preferredPayment: 'Credit Card'
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);

  const [orders, setOrders] = useState([]);

  const [wishlist] = useState([
    {
      id: '1',
      name: 'Premium Laptop',
      price: '$1499.99',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Ultra Slim Laptop',
      price: '$1299.99',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop'
    }
  ]);

  const [chatHistory] = useState([
    {
      id: '1',
      date: '2024-03-15',
      message: 'Thank you for your purchase!'
    },
    {
      id: '2',
      date: '2024-03-10',
      message: 'Your order has been shipped.'
    }
  ]);

  useEffect(() => {
    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Here you would typically upload the image to your server
        // uploadProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
        // Here you would typically upload the image to your server
        // uploadCoverImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
      setShowDeleteModal(false);
      setSelectedOrder(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedOrder) {
      // Here you would typically update the order in your backend
      setShowEditModal(false);
      setSelectedOrder(null);
    }
  };

  const handleDownloadOrders = async () => {
    setIsDownloading(true);
    
    try {
      // Create CSV content
      const headers = [
        'Order ID',
        'Date',
        'Items',
        'Total',
        'Status'
      ];

      const csvContent = [
        headers.join(','),
        ...orders.map(order => [
          `"${order.id}"`,
          `"${order.date}"`,
          `"${order.items}"`,
          `"${order.total}"`,
          `"${order.status}"`
        ].join(','))
      ].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error downloading orders:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white" style={spaceGrotesk}>
      {/* Profile Header */}
      <div className="bg-black/30 backdrop-blur-sm shadow-lg border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative">
            {/* Cover Image */}
            <div className="relative h-96 md:h-[22rem] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <label className="cursor-pointer bg-white/90 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-xl flex items-center space-x-3 hover:bg-white transition-all duration-300 transform hover:scale-105 font-medium shadow-xl">
                  <FaCamera className="h-6 w-6" />
                  <span>Change Cover Photo</span>
                  <input
                    type="file"
                    ref={coverImageRef}
                    onChange={handleCoverImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-20 left-8">
              <div className="relative">
                <img
                  className="h-40 w-40 rounded-full border-4 border-purple-500 object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  src={profileImage}
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 flex space-x-3">
                  <label className="cursor-pointer bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 shadow-lg transform hover:scale-110 transition-all duration-300">
                    <FaCamera className="h-5 w-5" />
                    <input
                      type="file"
                      ref={profileImageRef}
                      onChange={handleProfileImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 tracking-tight">{userData.fullName}</h1>
            <p className="text-gray-300 font-light text-lg tracking-wide">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl shadow-lg border border-purple-900/50 p-1">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile', icon: FaUser },
              { id: 'orders', label: 'Orders', icon: FaShoppingBag },
              { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
              { id: 'chat', label: 'Chat History', icon: FaComments },
              { id: 'settings', label: 'Settings', icon: FaCog },
              { id: 'signout', label: 'Sign Out', icon: FaSignOutAlt }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 py-4 px-6 rounded-lg font-medium text-sm transition-all duration-300 tracking-wide ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/30'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="mt-8">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="bg-black/30 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-purple-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.phone}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Shipping Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.shippingAddress}
                        onChange={(e) => setUserData({ ...userData, shippingAddress: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.shippingAddress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Billing Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.billingAddress}
                        onChange={(e) => setUserData({ ...userData, billingAddress: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.billingAddress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Preferred Payment Method</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.preferredPayment}
                        onChange={(e) => setUserData({ ...userData, preferredPayment: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg tracking-wide">{userData.preferredPayment}</p>
                    )}
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-purple-500/50 rounded-lg shadow-lg text-sm font-medium text-purple-300 bg-transparent hover:bg-purple-900/30 transition-all duration-300 flex items-center"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Orders Section */}
          {activeTab === 'orders' && (
            <div className="bg-black/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-purple-900/50">
              <div className="p-6 border-b border-purple-800 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">My Orders</h2>
                <button
                  onClick={handleDownloadOrders}
                  disabled={isDownloading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isDownloading
                      ? 'bg-purple-700 text-gray-300 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <FaDownload />
                      <span>Download Orders</span>
                    </>
                  )}
                </button>
              </div>
              {showNotification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                  Orders downloaded successfully!
                </div>
              )}
              <OrderHistory 
                orders={orders} 
                onEditOrder={handleEditOrder}
                onDeleteOrder={handleDeleteOrder}
              />
            </div>
          )}

          {/* Wishlist Section */}
          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-black/30 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-purple-900/50 transform hover:scale-105 transition-all duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">{item.name}</h3>
                    <p className="text-xl font-medium text-purple-400 mb-4 tracking-wide">{item.price}</p>
                    <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 font-medium transition-all duration-300 tracking-wide">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat History Section */}
          {activeTab === 'chat' && (
            <div className="bg-black/30 backdrop-blur-sm shadow-xl rounded-xl divide-y divide-purple-800 border border-purple-900/50">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="p-6 hover:bg-purple-900/20 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <p className="text-base text-white tracking-wide">{chat.message}</p>
                    <span className="text-sm text-gray-400 tracking-wide">{chat.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Section */}
          {activeTab === 'settings' && (
            <div className="bg-black/30 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-purple-900/50">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-6 tracking-wide">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Current Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2 tracking-wide">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-white/5 border border-purple-900/50 text-white shadow-sm focus:border-purple-400 focus:ring-purple-400 font-light p-3 transition-all duration-300 tracking-wide"
                      />
                    </div>
                    <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 font-medium transition-all duration-300 tracking-wide">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t border-purple-800 pt-8">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 tracking-wide">Delete Account</h3>
                  <p className="text-gray-300 mb-6 tracking-wide">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="bg-red-900/50 text-red-100 py-3 px-6 rounded-lg hover:bg-red-800/50 flex items-center font-medium border border-red-700 transition-all duration-300 tracking-wide">
                    <FaTrash className="mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Order Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 border border-purple-900/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">Edit Order</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Order ID</label>
                  <input
                    type="text"
                    value={selectedOrder.id}
                    readOnly
                    className="w-full bg-gray-800 border border-purple-900/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedOrder.date}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
                    className="w-full bg-gray-800 border border-purple-900/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Items</label>
                  <input
                    type="text"
                    value={selectedOrder.items}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, items: e.target.value })}
                    className="w-full bg-gray-800 border border-purple-900/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total</label>
                  <input
                    type="text"
                    value={selectedOrder.total}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, total: e.target.value })}
                    className="w-full bg-gray-800 border border-purple-900/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                    className="w-full bg-gray-800 border border-purple-900/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-purple-900/50 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 border border-purple-900/50 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/20 mb-4">
                <FaTrash className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Delete Order</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              {selectedOrder && (
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <p className="text-gray-300">Order ID: #{selectedOrder.id}</p>
                  <p className="text-gray-300">Items: {selectedOrder.items}</p>
                  <p className="text-gray-300">Total: {selectedOrder.total}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border border-purple-900/50 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
