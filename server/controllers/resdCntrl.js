import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
    const { tittle, description, address, country, city, facilities, image, userEmail }
        = req.body.data
    console.log(req.body.data)

    try {
        const residency = await prisma.residency.create({
            data: {
                tittle, description, address, country, city, facilities, image, owner: { connect: { email: userEmail } }
            }
        });
        res.send({ message: "Residency created succesfully", residency });

    } catch (error) {
        if (error.code === "P2002") {
            throw new Error("A residency with adress already there")
        }
        throw new Error(error.message)

    }
})