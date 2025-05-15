interface UserAvatarProps {
  imageUrl: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

const UserAvatar = ({ imageUrl, size = 'md', alt = 'User avatar' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ring-2 ring-blue-100`}>
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;