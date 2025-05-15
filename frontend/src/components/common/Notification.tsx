import { useState } from 'react';
import { Bell, ArrowRight, ExternalLink, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'Orders';
  time: string;
  title: string;
  description: string;
  productDetails?: {
    id: string;
    image: string;
    name: string;
    company: string;
    category: string;
    website: string;
    email: string;
    contact: string;
    description: string;
  };
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'Orders',
    time: '1 min ago',
    title: 'New Product #30854',
    description: '2 new product add by fashion nova tex.......',
    productDetails: {
      id: '#ID5002',
      image: 'https://images.pexels.com/photos/1719641/pexels-photo-1719641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Elegant Blue Blossom Party Dress with Jacket – For Girls',
      company: 'ZARA International',
      category: '(Fashion)',
      website: 'www.zarafashion.co',
      email: 'zarafashionworld@dayrep.com',
      contact: '812-801-9335',
      description: 'Dress your little one in timeless charm with our Elegant Blue Blossom Party Dress, a perfect blend of sophistication and playful grace.'
    }
  },
  {
    id: '2',
    type: 'Orders',
    time: '2 hour ago',
    title: 'Order #30851 refund form the seller...',
    description: 'Order refund request processed successfully'
  }
];

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setExpandedNotification(null);
    setIsFullWidth(false);
  };

  const toggleNotificationDetails = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleNotifications}
        className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Bell size={20} />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
          {notifications.length}
        </span>
      </button>

      {showNotifications && (
        <div className={`${
          isFullWidth 
            ? 'fixed inset-0 z-50 bg-white overflow-auto' 
            : 'absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50'
        }`}>
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold">Notification</h3>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 text-sm hover:underline">
                  Mark All as Read
                </button>
                {isFullWidth && (
                  <button 
                    onClick={toggleNotifications}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={`${isFullWidth ? 'container mx-auto px-4' : ''}`}>
            {notifications.map((notification) => (
              <div key={notification.id} className="border-b border-gray-100 last:border-0">
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <span>{notification.type}</span>
                          <span className="mx-2">•</span>
                          <span>{notification.time}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    {notification.productDetails && (
                      <button
                        onClick={() => toggleNotificationDetails(notification.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedNotification === notification.id ? 'Hide' : 'View Product'}
                      </button>
                    )}
                  </div>

                  {expandedNotification === notification.id && notification.productDetails && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex gap-4">
                        <img
                          src={notification.productDetails.image}
                          alt={notification.productDetails.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h5 className="font-semibold">ID: {notification.productDetails.id}</h5>
                          <p className="text-sm mt-1">
                            {notification.productDetails.company} {notification.productDetails.category}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <a href={`https://${notification.productDetails.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                              {notification.productDetails.website}
                            </a>
                            <ExternalLink size={14} className="text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.productDetails.email}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            {notification.productDetails.contact}
                          </p>
                        </div>
                      </div>
                      <h6 className="font-medium mt-4">{notification.productDetails.name}</h6>
                      <p className="text-sm text-gray-600 mt-2">
                        {notification.productDetails.description}
                      </p>
                      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-center">
            <button 
              onClick={toggleFullWidth}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              {isFullWidth ? 'Show Less' : 'See More'}
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;