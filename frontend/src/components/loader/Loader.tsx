const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <img
        src="/images/loader.gif"
        alt="Loading..."
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Loader;
