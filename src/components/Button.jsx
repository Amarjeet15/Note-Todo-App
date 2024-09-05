const Button = ({ onMouseEnter, onMouseLeave, onClick, icon }) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative h-full w-full hover:bg-slate-200 flex p-3 rounded-full *:hover:text-slate-900 z-10 transition-all duration-300 ease-in-out "
    >
      <span className="inline-block ">{icon && icon}</span>
    </button>
  );
};

export default Button;
