import express from 'express';
import { sendToFlask } from "../controllers/internal.controller.js";


const router = express.Router();

router.post('/send', sendToFlask);

export default router;



