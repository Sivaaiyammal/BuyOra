import { useState, useEffect } from "react"

const UserAvatar = ({
  imageUrl,
  size = "md",
  alt = "User avatar",
  onError
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  }

  const DEFAULT_AVATAR = "/1747901706239.png"

  const [imgSrc, setImgSrc] = useState(imageUrl)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(imageUrl || DEFAULT_AVATAR)
    setHasError(false) // reset error when imageUrl changes
  }, [imageUrl])

  const handleError = () => {
    if (!hasError) {
      setImgSrc(DEFAULT_AVATAR)
      setHasError(true)
    }
    if (onError) onError()
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden ring-2 ring-blue-100`}
    >
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  )
}

export default UserAvatar
