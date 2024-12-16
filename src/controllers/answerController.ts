import { Answer, ExamAttempt, PrismaClient } from "@prisma/client";
import { ServerMessage } from "../types";
import { Request, Response } from "express";

const answerClient = new PrismaClient().answer;
const attempClient = new PrismaClient().examAttempt;

const responseAnswer = async (req:Request, res:Response) => {
    let serverMsg:ServerMessage;
    try{
        const id_exam:number = Number(req.params.examId);
        const id_question:number = Number(req.params.questionId);
        const {attemptId, answer} = req.body;

        const attempt:ExamAttempt = await attempClient.findUnique({where:{id:attemptId}});

        if(attempt.status === 'IN_PROGRESS'){
            if((new Date().getTime() - attempt.startTime.getTime()) < 60 * 60 * 1000){
                await answerClient.create({
                    data:{
                        examAttempt:{connect: {id: attemptId}},
                        question:{connect: {id: id_question}},
                        answer: answer,
                        createAt: new Date()
                    }
                })
                serverMsg = {
                    status: 200,
                    message: `You responsed the question`
                };

                res.status(200).json(serverMsg);
            }else{
                serverMsg = {
                    status: 500,
                    message: `You has pass the limit time for the exam.`
                };
                await attempClient.update({
                    where:{
                        id: attemptId,
                    },
                    data:{
                        status: "OUT_OF_TIME"
                    }
                })
                return res.status(500).json(serverMsg);
            }
        }else{
            serverMsg = {
                status: 500,
                message: `The exam is not in progress.`
            };
            return res.status(500).json(serverMsg);
        }
    } catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `The question couldn't be responded`
        };
        res.status(500).json(serverMsg);
    }

}

export const answerController = {
    responseAnswer
}