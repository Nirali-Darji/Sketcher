function HorizontalButton({ name, className, icon, handleClick }) {
  return (
    <>
      <div
        className={`btn hover:bg-gray-50 mx-auto w-80 flex align-items-center px-17 py-2 cursor-pointer text-center gap-1 border border-gray-400 rounded-lg shadow ${className}`}
        onClick={handleClick}
      >
        <div className="text-lg flex mx-auto gap-2">
          <div className="text-lg my-auto "> {icon}</div>
          {name}
        </div>
      </div>
    </>
  );
}

export default HorizontalButton;
