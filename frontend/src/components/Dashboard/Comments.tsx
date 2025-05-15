import React from 'react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    country?: string;
  };
  product: {
    name: string;
    id: string;
  };
  rating: number;
  comment: string;
  time: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="py-3 border-b border-gray-100">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={comment.user.avatar} 
              alt={comment.user.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <span className="font-medium text-sm">{comment.user.name}</span>
              {comment.user.country && (
                <span className="ml-2">
                  <img 
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${comment.user.country}.svg`} 
                    alt={comment.user.country} 
                    className="inline-block w-4 h-3"
                  />
                </span>
              )}
              <div className="flex items-center mt-1">
                <StarRating rating={comment.rating} />
              </div>
            </div>
            <div className="text-xs text-gray-500">{comment.time}</div>
          </div>
          
          <div className="mt-1">
            <div className="text-sm text-gray-800">
              {comment.product.name} (ID: {comment.product.id})
            </div>
            <p className="text-sm text-gray-600 mt-1">{comment.comment}</p>
          </div>
          
          <div className="mt-2">
            <button className="text-xs text-blue-600 hover:text-blue-800">[Reply]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Comments: React.FC = () => {
  const comments: Comment[] = [
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
        country: 'IN'
      },
      product: {
        name: 'Bracelet Platinum Plated',
        id: 'RT15246637'
      },
      rating: 4,
      comment: 'The Design Is Elegant And Exactly As Shown. Happy With My Purchase!',
      time: '2hrs'
    },
    {
      id: '2',
      user: {
        name: 'Meena K.',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
        country: 'IN'
      },
      product: {
        name: 'Light Bulb WiFi Connect',
        id: 'RT15249630'
      },
      rating: 1,
      comment: 'Not Connecting To App Properly. Please Fix It.',
      time: '2hrs'
    },
    {
      id: '3',
      user: {
        name: 'Rahul Verma',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      product: {
        name: 'Light Bulb WiFi Connect',
        id: 'RT15249630'
      },
      rating: 1,
      comment: 'Not Connecting To App Properly. Please Fix It.',
      time: '5min'
    },
    {
      id: '4',
      user: {
        name: 'Mena.',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      product: {
        name: 'Light Bulb WiFi Connect',
        id: 'RT15249630'
      },
      rating: 2,
      comment: 'Not Connecting To App Properly. Please Fix It.',
      time: '2hrs'
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">New Comments</h3>
      
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        <div className="mt-2 text-xs text-gray-500">Showing 4 Results</div>
      </div>
    </div>
  );
};

export default Comments;