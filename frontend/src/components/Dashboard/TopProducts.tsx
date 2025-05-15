import React from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  orders: number;
  image: string;
}

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-100">
      <div className="w-12 h-12 rounded bg-gray-100 mr-3 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
        <div className="text-xs text-gray-500">ID: {product.id}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold">₹{product.price}</div>
        <div className="text-xs text-gray-500">{product.orders} Orders</div>
      </div>
    </div>
  );
};

const TopProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 'RT15246637',
      name: 'Bracelet Platinum Plated',
      price: '100',
      orders: 6,
      image: 'https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'RT15246680',
      name: 'Sofa Single Light Coco Creamy',
      price: '108',
      orders: 4,
      image: 'https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'RT15246640',
      name: 'Men Blaze',
      price: '1600',
      orders: 6,
      image: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'RT15249630',
      name: 'Light Bulb WiFi BT Connect',
      price: '80',
      orders: 8,
      image: 'https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'RT15246640',
      name: 'Bracelet Platinum Plated',
      price: '100',
      orders: 6,
      image: 'https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Top Selling Products</h3>
      
      <div>
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopProducts;