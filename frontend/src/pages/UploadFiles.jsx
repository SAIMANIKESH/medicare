import { useState, useRef } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

export default function UploadFiles() {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file");
    console.log("Uploading file:", file);
    // TODO: Hook with backend API
    alert(`File "${file.name}" uploaded successfully!`);
    setFile(null);
    inputRef.current.value = ""; // Reset file input
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Prescription or Reports</h2>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 max-w-xl"
      >
        <input
          type="file"
          ref={inputRef}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="file"
        />

        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-700">Selected: {file.name}</p>
          </div>
        )}

        <button
          type="submit"
          className="button"
          onClick={(e) => e.currentTarget.blur()}
          disabled={!file}
        >
          <IoCloudUploadSharp className="inline-block mr-2" />
          Upload
        </button>
      </form>
    </div>
  );
};