import express from "express";
import {  deleteFileFromAWSFn, getUploadedFilesFromAWSFn, uploadFilesToAWS } from "../controllers/fileHandlers.js";
import multer from "multer";

const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

routes.post("/upload",upload.single("file"), uploadFilesToAWS);
routes.get("/files", getUploadedFilesFromAWSFn);
routes.post('/delete-file',deleteFileFromAWSFn)

export default routes;