import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from 'bcrypt'


export const registerUser = async (req:Request, res:Response) => {
    const user = req.body;
    const name = user.name;
    const email = user.email;
    const password = user.password;
     console.log(user)

    console.log(name, email, password)

    if (!name || !email || !password){
        return res.status(403).json({
            message: "all fields are required"
        })
    }

    const isUserExist = await prisma.user.findFirst({
        where: {
            email
        }
    })

    

    if(isUserExist) {
        return res.status(409).json({
            msg: "user already exist with this email"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const data = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

   

    return res.status(200).json({
        message: "done",
        data
    })

    
}

export const loginUser = async (req: Request, res:Response) => {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    console.log(user)

    console.log(email, password)

    if (!email || !password){
        return res.status(403).json({
            message: "all fields are required"
        })
    }


    const isUserExist = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    
    console.log("is user", isUserExist)

    // const lotuser = await prisma.user.findMany()

    // console.log("lotuser", lotuser)

    

    if( !isUserExist) {
        return res.status(403).json({
            msg: "user doesn't exist with this email"
        })
    }

    console.log("isUserexist", isUserExist)

    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)

    if (isUserExist && isPasswordCorrect) {
        return res.status(200).json(
            isUserExist.id
        )
    }

    return res.status(401).json({
        msg: "Invalid credentials"
    })
}

