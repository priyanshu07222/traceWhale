import { Request, Response } from "express";
import prisma from "../db";

const trackAddress = async (req:Request, res: Response) => {
    const response = req.body;
    const address = response.address;
    let amount = Number(response.amount)
    const userId = Number(req.query.userId)

    console.log("userid", userId)

    console.log(address, amount, userId)

    if (!address) {
        return res.status(401).json({
            msg: "no address passed"
        })
    }

    if(!amount) {
        amount = 0;
    }

    const data = await prisma.trackAccounts.findFirst({
        where: {
            AND: [
                {userId}, {accountAddress:address}
            ]
        }
    })

    if (data) {
        return res.status(403).json({
            msg: "Already have account with this address"
        })
    }

    const trackAccounts = await prisma.trackAccounts.create({
        data: {
            accountAddress: address,
            amount,
            userId: Number(userId)
        }
    })

    res.status(201).json({
        msg:"added successfully",
        trackAccounts
    })

}

export const getTrackingAddress = async(req:Request, res:Response) => {
    const userId = Number(req.query.userId)

    if(!userId) {
        return null;
    }

    const data = await prisma.trackAccounts.findMany({
        where: {
           userId
        }
    })


    if(!data){
        return "User not found"
    }

    return res.json({
        data
    })
}

export default trackAddress;