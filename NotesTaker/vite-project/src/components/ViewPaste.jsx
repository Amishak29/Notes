import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);

  // State to store highlighted sections
  const [highlights, setHighlights] = useState([]);

  // Function to handle text highlighting
  const handleHighlight = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      // Add the selected text to the highlights state if it's not already highlighted
      if (!highlights.includes(selectedText)) {
        setHighlights([...highlights, selectedText]);
      }
      selection.removeAllRanges(); // Deselect the text after highlighting
    }
  };

  // Function to render content with highlighted text
  const renderHighlightedText = (text) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={highlights.includes(word) ? "bg-yellow-200 px-1" : ""}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div
      className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0"
      onMouseUp={handleHighlight} // Call handleHighlight when user releases mouse
    >
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste?.title || ""}
          disabled
          className="w-full text-black border border-input rounded-md p-2"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Copy button */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content || "");
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="group-hover:text-success-500" size={20} />
              </button>
            </div>
          </div>

          {/* Render highlighted content */}
          <div
            className="w-full p-3 bg-white dark:bg-gray-700 text-black dark:text-white"
            style={{
              caretColor: "#000",
            }}
          >
            {renderHighlightedText(paste?.content || "Write Your Content Here...")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
