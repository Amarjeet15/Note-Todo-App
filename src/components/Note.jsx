import { useEffect, useRef } from "react";
import { useTodo } from "../context/TodoContext";
import DeleteIcon from "./DeleteIcon";

const Note = ({ noteId, item }) => {
  const {
    data,
    setData,
    isShowDelIcon,
    setIsShowDelIcon,
    handleShowDelIcon,
    targetNote,
    setTargetNote,
  } = useTodo();
  const textAreaRef = useRef(null);

  const handleDelNote = (noteId) => {
    const updateNotes = data.filter((note) => note.id !== noteId);
    setData(updateNotes);
    localStorage.setItem("data", JSON.stringify(updateNotes));
  };

  const handleEditNote = (e, noteId, field) => {
    const updatedNoteData = data.map((note) => {
      if (note.id === noteId) {
        const updatedNote = { ...note };
        updatedNote[field] = e.target.value;
        return updatedNote;
      }
      return note;
    });

    setData(updatedNoteData);
    localStorage.setItem("data", JSON.stringify(updatedNoteData));
  };

  //this function use for targeting the note  for editing and also
  const handleNoteClick = (noteId) => {
    setTargetNote(noteId);
    adjustTextAreaHeight(); //this function adjusting  the textarea height according to note context
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.style.overflow = "hidden";
  };

  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.style.height = "auto"; // Set initial height to 'auto'
      const height = textArea.scrollHeight;
      textArea.style.height = `${height}px`;
    }
  };

  const handleClickOutSide = (e) => {
    if (!e.target.closest("#note_container")) {
      if (
        e.target.tagName.toLowerCase() !== "h2" &&
        e.target.tagName.toLowerCase() !== "p"
      ) {
        setTargetNote(false);
        document.body.style.overflow = "auto";
      }
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [targetNote, data]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);

    return () => window.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <div className="hover:shadow-md hover:shadow-neutral-500  rounded-md ">
      <div
        key={noteId}
        onClick={() => handleNoteClick(noteId)}
        onMouseEnter={() => handleShowDelIcon(noteId)}
        onMouseLeave={() => setIsShowDelIcon(false)}
        className={
          targetNote === noteId
            ? "absolute inset-0  z-20  backdrop-blur-[1px]"
            : `relative  card border border-zinc-400 bg-transparent  rounded-md p-3   flex flex-col   `
        }
      >
        <div
          id="note_container"
          className={
            targetNote === noteId
              ? "bg-white rounded-lg absolute  left-1/2 top-[25%] sm:top-1/2  -translate-x-1/2 -translate-y-1/2 shadow-md shadow-gray-500  p-4 w-[75dvw] sm:w-[55dvw]   border-t border-zinc-300"
              : ""
          }
        >
          <div
            className={`p-[.1rem]  ${targetNote ? ":hover:cursor-text" : ""} `}
          >
            {targetNote === noteId ? (
              <>
                <textarea
                  rows={item.title.length >= 100 ? 2 : 1}
                  value={item.title}
                  ref={textAreaRef}
                  onChange={(e) => handleEditNote(e, noteId, "title")}
                  className="font-semibold text-[1rem]  outline-none w-full line-clamp resize-none"
                ></textarea>
                <textarea
                  className={`text-[.93rem] outline-none w-full resize-none max-h-[30dvh] sm:max-h-[50dvh]  `}
                  value={item.text}
                  ref={textAreaRef}
                  onChange={(e) => handleEditNote(e, noteId, "text")}
                ></textarea>
              </>
            ) : (
              <>
                <h2 className="font-semibold leading-[1.3rem] text-[1rem] outline-none line-clamp-1 ">
                  {item.title}
                </h2>
                <p className="text-[.93rem] outline-none mt-1.5  overflow-hidden line-clamp-[4] sm:line-clamp-[9]">
                  {item.text}
                </p>
              </>
            )}

            {isShowDelIcon === noteId && (
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelNote(noteId);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
