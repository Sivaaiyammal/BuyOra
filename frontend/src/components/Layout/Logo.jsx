const Logo = ({ collapsed }) => {
  return (
    <div className="flex items-center">
      <img
        src="/logo.png"
        alt="BuyOra"
        className={`h-14 w-auto object-contain ${collapsed ? "mx-auto" : ""}`}
      />
    </div>
  )
}

export default Logo
