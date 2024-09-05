import { PiCaretDoubleDownBold } from "react-icons/pi";
import { TbSearch } from "react-icons/tb";
import { useTodo } from "../context/TodoContext";
import { BiArrowBack } from "react-icons/bi";

// Search div
const SearchBar = () => {
  const { searchItem, setSearchItem, showSearchBar, setShowSearchBar } =
    useTodo();

  const handleHideSearchBar = () => {
    setShowSearchBar(false);
    setSearchItem("");
  };

  return (
    <div
      className={`note-container flex items-center justify-start gap-4 w-[36rem] bg-white p-2 pl-4 py-2 m-3 rounded-lg shadow-md shadow-zinc-400 border-t-[1px] border-zinc-200 transition-all duration-300 ease-in-out  ${
        showSearchBar
          ? "translate-y-0 opacity-100  "
          : "translate-y-4 opacity-0 hidden  "
      } `}
    >
      {/* this hide the Search div when clicked */}
      <button
        onClick={handleHideSearchBar}
        className="hover:bg-gray-300 rounded-full p-1 transition-all duration-300 ease-in-out "
      >
        <BiArrowBack size={20} />
      </button>
      <form className="outline-none w-full">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          placeholder="Search..."
          className="outline-none w-full  "
        />
      </form>
    </div>
  );
};

export default SearchBar;

// When click on Search Icon then show the Search div or hover animation and show tooltip
export const SearchIcon = () => {
  const { showSearchBar, setShowSearchBar, showTooltip, setShowTooltip } =
    useTodo();

  // this handle when click on search then it scroll the top
  const handleClickSearchIcon = () => {
    setShowSearchBar(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={` z-10 fixed  md:absolute  ${
        showSearchBar
          ? "translate-y-3 opacity-0  md:-top-10"
          : "  opacity-100  md:-top-3  "
      } size-10 left-2/4 right-2/4 bottom-3  md:left-2/4  md:right-2/4  transition-all duration-300 ease-in-out `}
    >
      <button
        onClick={handleClickSearchIcon}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative  z-10 transition-all  duration-300  ease-in-out flex flex-col items-center  justify-center rounded-md bg-neutral-700 md:bg-white md:rounded-b-full shadow-md shadow-neutral-400 md:hover:bg-neutral-100 hover:text-neutral-700 overflow-hidden size-9 ${
          showSearchBar ? "hidden" : ""
        } `}
      >
        {/* search icon */}
        <span
          className={`bg-transparent border-black   transition-all  duration-300  ease-in-out   ${
            showTooltip
              ? "md:translate-y-[.75rem] transition-all duration-400 ease-in-out "
              : "md:-translate-y-8"
          }  `}
        >
          <TbSearch
            size={18}
            className={`size-full text-neutral-100 md:text-neutral-700 border-black `}
          />
        </span>

        {/* down arrow icon */}
        <span
          className={`bg-transparent border-black   transition-all  duration-300  ease-in-out hidden md:block  ${
            showTooltip
              ? "translate-y-8 transition-all duration-400 ease-in-out "
              : "-translate-y-[.3rem]"
          }  `}
        >
          <PiCaretDoubleDownBold
            size={15}
            className={`size-full   border-black `}
          />
        </span>
      </button>
      <ToolTip showTooltip={showTooltip} />
    </div>
  );
};

//ToolTip component of Search  Icon
const ToolTip = ({ showTooltip }) => {
  return (
    <span
      className={`absolute -bottom-[.15rem]  bg-neutral-700 text-neutral-100 px-3 pb-1 pt-[.15rem] rounded-[.3rem] transition-all duration-[322ms] ease-in-out z-0  select-none hidden md:block ${
        showTooltip
          ? " opacity-100 translate-x-10  scale-75  "
          : "  opacity-0 scale-[.5] translate-x-6  "
      }  `}
    >
      Search
    </span>
  );
};
