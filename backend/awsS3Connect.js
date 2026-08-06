// Import necessary modules from AWS SDK
const { S3Client, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config()
// Initialize an S3 client with provided credentials
const s3Client = new S3Client({
    region: process.env.AWS_REGION, // Specify the AWS region from environment variables
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID, // Access key ID from environment variables
        secretAccessKey: process.env.AWS_SECRETACCESSKEY // Secret access key from environment variables
    }
});

// Upload file
exports.uploadFileToAWS = async(fileName,filePath)=>{
    try{
        const uploadParams = {
            Bucket:process.env.AWS_BUCKET_NAME, // Specify the bucket name from environment variables,
            Key:fileName,
            Body:filePath.buffer // Use the buffer from the filePath object for the file content
        }
      const response =   await s3Client.send(new PutObjectCommand(uploadParams))
      return response
    }catch(err){
        return 'error'
    }
}

exports.getUploadedFilesFromAWS = async()=>{
    const uploadedFiles = await s3Client.send(new ListObjectsV2Command({ Bucket: process.env.AWS_BUCKET_NAME })); 
    return uploadedFiles?.Contents;
}

exports.deleteFileFromAWS = async(filename)=>{
    try{
        const deleteParams = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:filename
        }
        const response = await s3Client.send(new DeleteObjectCommand(deleteParams))
        return response
    }catch(err){
        return 'error'
    }
}
