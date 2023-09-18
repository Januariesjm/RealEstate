import express from 'express';
import { bookVisit, createUser } from '../controllers/userCntrl.js';

const router = express.Router()

router.post("/register", createUser)
router.post ("/bookVisit/:id", bookVisit)
router.get ("/allBookings", allBookings)
export {router as userRoute}