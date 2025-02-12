
function HorizontalButton({ name, className, icon, handleClick }) {
    return (
      <>
        <div
          className={`btn hover:bg-gray-100 w-60 mx-auto flex px-17 py-1 cursor-pointer text-center gap-1 border border-gray-800 rounded-xl ${className}`}
          onClick={handleClick}
        >
          <div className="text-lg m-auto">{icon}</div>
          <div className="m-auto text-lg">
              {name}
          </div>
        </div>
      </>
    );
  }
  
  export default HorizontalButton;
  