import FileUpload from './Components/FileUpload';
import FileList from './Components/FileList';
import { useState } from 'react';

export default function App() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
<div className="sticky top-0 py-2 bg-gray-100">
  <h1 className="text-2xl  font-bold mb-2 text-gray-800 ">Personal File Vault</h1>
<hr className='h-1 w-12 bg-gray-800 rounded-lg my-2'/>
</div>
   <div className="flex max-[600px]:flex-col gap-4 w-full">
  <div className="w-full md:w-1/2 h-[400px] rounded-lg bg-white p-6 shadow">
    <h2 className="mb-4 text-xl font-semibold">Upload Files</h2>
    <FileUpload onUploadSuccess={setUploadSuccess} />
  </div>

  <div className="w-full md:w-1/2 h-[400px] rounded-lg bg-white p-6 shadow overflow-y-auto">
    <h2 className="mb-4 text-xl font-semibold">Your Files</h2>
    <FileList onSuccess={uploadSuccess} />
  </div>
</div>
    </div>
    </>
  );
}