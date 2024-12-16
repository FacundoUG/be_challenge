import { Answer, Exam, ExamAttempt, PrismaClient, Question } from "@prisma/client";
import { Request, Response } from "express";
import { ServerMessage } from "../types";
import { examMapper } from "../mappers/examMapper";

const examClient = new PrismaClient().exam;
const questionClient = new PrismaClient().question;
const answerClient = new PrismaClient().answer;
const attemptClient = new PrismaClient().examAttempt;

const createExam = async (req: Request, res:Response) => {
    let serverMsg:ServerMessage;
    try {
        const {title, questions} = req.body;
        const newExam:Exam = await examClient.create({
            data:{
                title: title
            }
        });

        const questionData:Question = questions.map(question => ({
            ...question,
            examId: newExam.id,
            options: question.options ? question.options.join(',') : null
        }));

        const examQuestionQty = await questionClient.createMany({
            data: questionData
        });
        
        serverMsg = {
            status: 200,
            message: {
                exam: examMapper.toDTO(newExam),
                questionsQty: examQuestionQty
            }
        };

        res.status(200).json(serverMsg);
    } catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `The exam couldn't be created`
        };
        res.status(500).json(serverMsg);
    }
}

const finishExam = async (req: Request, res:Response) => {
    let serverMsg:ServerMessage;
    try {
        const id_exam:number = Number(req.params.id);
        const {attemptId} = req.body;
        
        const answerQty:number = (await answerClient.findMany({where:{examAttemptId:attemptId}})).length;
        const questionQty:number = (await questionClient.findMany({where:{examId:id_exam}})).length;
        const attempt:ExamAttempt = await attemptClient.findUnique({where:{id:attemptId}});

        console.log(answerQty);
        console.log(questionQty);
        
        if(attempt.status != 'OUT_OF_TIME' && answerQty === questionQty){
            serverMsg = {
                status: 200,
                message: "Congrats!!. you has finished the exam."
            };
            await attemptClient.update({
                where:{
                    id: attemptId,
                },
                data:{
                    status: "FINISHED"
                }
            })
            res.status(200).json(serverMsg);
        }else{
            if(answerQty != questionQty){
                serverMsg = {
                    status: 500,
                    message: `You have questions without answer.`
                };
                res.status(500).json(serverMsg);
            }else{
                serverMsg = {
                    status: 500,
                    message: `You has pass the limit time for the exam.`
                };
                res.status(500).json(serverMsg);
            }
        }
    }catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `The exam couldn't be finished`
        };
        res.status(500).json(serverMsg);
    }
}

const getExam = async (req: Request, res:Response) => {
    let serverMsg:ServerMessage;
    try {
        const id_exam:number = Number(req.params.id);
        const userId:number = Number(req.query.userId);
        
        const attempt:ExamAttempt = (await attemptClient.findUnique({where:{userId:userId,examId:id_exam}}));

        const answer = await answerClient.findMany({where:{examAttemptId:attempt.id}});
        
        serverMsg = {
            status: 200,
            message: {
                answer: answer,
                status: attempt.status
            }
        };

        res.status(200).json(serverMsg);
    }catch (error) {
        console.log(`An error has been ocurred: ${error}`)
        serverMsg = {
            status: 500,
            message: `Couldn't obtain the exam`
        };
        res.status(500).json(serverMsg);
    }
}

export const examController = {
    createExam,
    finishExam,
    getExam
}
