import axios from "axios"
import { useEffect, useState } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

const FileList =({onSuccess}:{onSuccess:boolean})=>{
    const [uploadedFiles,setUploadedFiles] = useState([])
    const fetchUploadedFiles = async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/files`)
            setUploadedFiles(response.data.response)
            
        }
        catch(err){
            console.log(err)
        }
    }
    const handleViewFile = async(filename:string)=>{
      const url = `https://${import.meta.env.VITE_BUCKET_NAME}.s3.${import.meta.env.VITE_REGION}.amazonaws.com/${filename}`
      window.open(url,'__blank')
    }
    const handleDeleteFile = async(filename:string)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-file`,{data:filename})
            if(response.data.message === 'File deleted'){
                fetchUploadedFiles()
            }
        }catch(err){
            console.log(err)
        }   
        
    }
    useEffect(()=>{
        fetchUploadedFiles()
    },[onSuccess])
    
    return <>
   <div className="space-y-3">
  {uploadedFiles?.map((file: any, index: number) => (
  <div
    key={index}
    className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
  >
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        📄
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="truncate font-medium text-gray-800"
          title={file.Key}
        >
          {file.Key}
        </p>

        <p className="text-sm text-gray-500">
          {file.Size ? `${(file.Size / 1024).toFixed(2)} KB` : ""}
        </p>
      </div>
    </div>

    
      <AiOutlineEye  onClick={()=>handleViewFile(file.Key)} title="View File" className="w-full rounded-md h-5 w-5 cursor-pointer  text-sm font-medium text-black transition  sm:w-auto"/>
      <BiTrash className="text-red-500 hover:text-red-700" onClick={()=>handleDeleteFile(file.Key)} title="Delete File"/>
  </div>
))}
</div>
    </>
}

export default FileList