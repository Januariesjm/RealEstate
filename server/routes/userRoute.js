import express from 'express';
import { getAllBookings, bookVisit, createUser } from '../controllers/userCntrl.js';

const router = express.Router()

router.post("/register", createUser)
router.post ("/bookVisit/:id", bookVisit)
router.post ("/allBookings", getAllBookings)
export {router as userRoute}