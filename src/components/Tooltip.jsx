const Tooltip = ({ text, isShowListIcon }) => {
  return (
    <span
      className={`absolute -bottom-11 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  transition-all duration-[322ms] ease-in-out transform bg-neutral-700  py-[.15rem] pb-1 rounded-[.25rem] text-[.8rem] text-white w-[4.5rem] text-center z-10   ${
        isShowListIcon
          ? "opacity-100 select-none scale-95  "
          : "-translate-y-6 opacity-0 select-none scale-75 "
      } `}
    >
      {text}
    </span>
  );
};

export default Tooltip;
