// src/components/Editor.jsx
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, setValue }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="w-full bg-white dark:bg-gray-700 text-black dark:text-white rounded-md"
      placeholder="Write your content here..."
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ],
      }}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'align',
        'link', 'image'
      ]}
    />
  );
};

export default Editor;
