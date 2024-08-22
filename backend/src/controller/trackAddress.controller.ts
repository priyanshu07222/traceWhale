import { Request, Response } from "express";
import prisma from "../db";

const trackAddress = async (req:Request, res: Response) => {
    const response = req.body;
    const address = response.address;
    const amount = Number(response.amount)
    const userId = Number(req.query.userId)

    console.log("userid", userId)

    console.log(address, amount, userId)

    if (!address) {
        return res.status(401).json({
            msg: "no address passed"
        })
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

export default trackAddress;