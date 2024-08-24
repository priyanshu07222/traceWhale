import { Request, Response } from "express";
import prisma from "../db";
import getAllTrackedAddress from "../utils/getAlltrackedAddress";

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

    const data = await getAllTrackedAddress(userId);
    console.log(data, "hello")

    return res.json({
        data
    })
}

export const updateAddressAmount = async(req:Request, res: Response) => {
    const id = req.body.id;
    let amount = req.body.amount;

    if(!id){
        return res.status(409).json({
            msg: "id not provided"
        })
    }

    if(!amount){
        amount = 0;
    }

    try {
        const x = await prisma.trackAccounts.update({
            where: {
                 id
            },
            data: {
                amount
            }
        })

        return res.status(201).json({
            msg: "update"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAddress = async(req: Request, res: Response) => {
    const id = req.body.id;


    if(!id){
        return res.status(409).json({
            msg: "id not provided"
        })
    }

    try {
        const delAddress = await prisma.trackAccounts.delete({
            where:{
                id
            }
        })

        return res.status(201).json({
            delAddress
        })
    } catch (error) {
        console.log(error)
    }
}

export default trackAddress;