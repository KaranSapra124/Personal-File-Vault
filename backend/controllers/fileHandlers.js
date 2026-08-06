import { deleteFileFromAWS, getUploadedFilesFromAWS, uploadFileToAWS} from "../awsS3Connect.js"

export const uploadFilesToAWS = async(req,res)=>{
    try{
        const file = req.file
        if(!file) return res.status(402).send({message:"File is missing"})

        const response = await uploadFileToAWS(file.originalname,file)
        if(response){
            return res.status(200).send({message:'Uploaded',response})
        }
    }catch(err){
        console.log(err)
        return res.status(401).send({message:"Error while uploading...",err})
    }
}
export const getUploadedFilesFromAWSFn = async(req,res)=>{
    try{
        const response = await getUploadedFilesFromAWS()   
        return res.status(200).send({message:'Files retrieved',response})
    }
    catch(err){
        return res.status(401).send({message:"Error while retrieving files...",err})
    }
}

export const deleteFileFromAWSFn = async(req,res)=>{
    try{
        const {data} = req.body
        const response = await deleteFileFromAWS(data)
        return res.status(200).send({message:'File deleted',response})
    }catch(err){
        return res.status(401).send({message:"Error while deleting file...",err})
    }
}
