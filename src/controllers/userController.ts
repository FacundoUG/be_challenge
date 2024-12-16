import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { ServerMessage, UserDTO } from "../types";
import { UserMapper } from "../mappers/userMapper";

const userClient = new PrismaClient().user;

const createUser = async (req: Request, res:Response) => {
    let serverMsg:ServerMessage;
    try {
        const {name, email} = req.body;
        const newUser:User = await userClient.create({
            data:{
                name: name,
                email: email
            }
        });
        serverMsg = {
            status: 200,
            message: UserMapper.toDTO(newUser)
        };

        res.status(200).json(serverMsg);
    } catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `The user couldn't be created`
        };
        res.status(500).json(serverMsg);
    }
}


export const userController = {
    createUser
} 