import { Exam, ExamAttempt, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { ServerMessage } from "../types";
import { examAttemptMapper } from "../mappers/examAttemptMapper";

const ExamAttemptClient = new PrismaClient().examAttempt;
const UserClient = new PrismaClient().user;
const ExamClient = new PrismaClient().exam;

const startExamAttempt = async (req:Request, res:Response) => {
    let serverMsg:ServerMessage;
    try {
        const id_exam:number = Number(req.params.id);
        const userId:number = Number(req.query.userId);

        const newExamAttempt:ExamAttempt = await ExamAttemptClient.create({
            data: {
                user: { connect: { id: userId } },
                exam: { connect: { id: id_exam } },
                status: 'in_progress',
                startTime: new Date()
            },
        }) 

        const user:User = await UserClient.findUnique({where:{id:userId}})
        const exam:Exam = await ExamClient.findUnique({where:{id:id_exam}})

        serverMsg = {
            status: 200,
            message: examAttemptMapper.toDTO(newExamAttempt,user,exam)
        };
        res.status(200).json(serverMsg);
    } catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `The exam couldn't be started`
        };
        res.status(500).json(serverMsg);
    }
}

export const examAttemptController = {
    startExamAttempt
}