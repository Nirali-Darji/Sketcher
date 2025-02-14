export default function Button({
  name,
  icon: Icon,
  className,
  onClick,
  value,
}) {
  return (
    <>
      <button
        className={`btn hover:bg-gray-200 cursor-pointer flex flex-col p-6 text-center gap-1 ${className}`}
        onClick={onClick}
        value={value}
      >
        <div className="text-xl mx-auto" value={value}>
          <Icon />
        </div>
        <h4 value={value}>{name}</h4>
      </button>
    </>
  );
}
