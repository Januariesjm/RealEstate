import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");

    let { email } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email: email } })
    if (!userExists) {
        const user = await prisma.user.create({ data: data.body });
        res.send({
            message: "user registered successfully",
            user: user
        });
    } else res.status(201).send({ message: "user already registered" })


});

//function to book a visit to a residency
export const bookVisit = asyncHandler(async(req, res)=>{
    const {email, date} = req.body
    const {id} = req.params

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: True}
        })
        if (alreadyBooked.bookedVisits.some((visit)=> visit.id == id)) {
            res.status(400).json({message: "This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where: {emial: email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            });
            res.send("your visit is booked successfully")
        
        }
        
    } catch (error) {
       throw new Error (error.message) 
    }

})

//function to get all bookings of a user
export const getAllBookings = asyncHandler(async(req, res) =>{
   const {email} = req.body
   try {
    const bookings = await prisma.findUnique ({
        where: {email},
        select: {bookedVisits: true}
    })
    res.status(200).send(bookings)
   } catch (error) {
    throw new Error(error.message);
   }
})