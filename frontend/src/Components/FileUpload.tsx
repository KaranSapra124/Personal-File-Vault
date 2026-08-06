import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function FileUpload({onUploadSuccess}:{onUploadSuccess:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (files:FileList) => {
    if (!files.length) return;

    setUploading(true);
    setError('');

    for (let file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/upload`, formData);

        onUploadSuccess(true); // Refresh file list
      } catch (err:any) {
        setError(err?.response?.data || 'Upload failed');
      }
    }

    setUploading(false);
  };

  const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false);
        handleUpload(e.dataTransfer.files);
    
  };

  return (
    <div
    onDrop={handleDrop}
   onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragEnter={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={(e) => {
    e.preventDefault();
    setIsDragging(false);
  }}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <AiOutlineCloudUpload size={40} className="mx-auto mb-2 text-blue-500" />
      <p className="text-gray-700 mb-2">Drag & drop files here</p>
      <p className="text-sm text-gray-500 mb-4">or</p>
        <input id="fileInput"
          type="file"
          multiple
          onChange={(e) => handleUpload(e.target.files as FileList)}
          className="hidden"
        />
      <label htmlFor="fileInput" className="cursor-pointer w-fit mx-auto flex items-center gap-2  rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
    <AiOutlineCloudUpload className="text-lg"/>  <span className="font-bold">Upload</span>
      </label>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
    </div>
  );
}