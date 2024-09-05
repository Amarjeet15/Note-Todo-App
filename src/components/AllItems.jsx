import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTodo } from "../context/TodoContext";
import Note from "./Note";
import Todo from "./Todo";

const AllItems = () => {
  const { data, searchItem } = useTodo();

  return (
    <>
      {/* if data is less then  0 then show this */}
      {data.length === 0 && (
        <div className=" w-full  flex justify-center items-center select-none ">
          <p className="text-[6dvw] font-black text-zinc-500">I'm Empty </p>
        </div>
      )}

      {/* if data is greater then 0 then show this */}
      {data.length !== 0 && (
        <ResponsiveMasonry
          style={{
            padding: "3vh 6vw",
          }}
          columnsCountBreakPoints={{
            425: 1,
            501: 2,
            768: 3,
            900: 4,
          }}
        >
          <Masonry gutter="13px">
            {data
              .filter((item) => {
                return searchItem.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchItem) ||
                      item.type.toLowerCase().includes(searchItem);
              })
              .map((item) =>
                // Conditional logic to display Note or Todo component based on item.type
                item.type === "note" ? (
                  <Note key={item.id} noteId={item.id} item={item} />
                ) : (
                  <Todo key={item.id} todoId={item.id} item={item} />
                )
              )}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default AllItems;
