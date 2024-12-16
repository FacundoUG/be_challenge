import { Request, Response, Router } from "express";
import { examController } from "../controllers/examController";
import { examAttemptController } from "../controllers/examAttemptController";
import { answerController } from "../controllers/answerController";

const examRouter:Router = Router();

examRouter.post('', async (req:Request, res: Response) => {
    examController.createExam(req,res);
});

examRouter.post('/:id/start', async (req:Request, res: Response) => {
    examAttemptController.startExamAttempt(req,res);
});

examRouter.post('/:examId/questions/:questionId/answer', (req:Request, res: Response) => {
    answerController.responseAnswer(req,res);
});

examRouter.post('/:id/finish', (req:Request, res: Response) => {
    examController.finishExam(req,res);
});

examRouter.get('/:id/results', (req:Request, res: Response) => {
    examController.getExam(req,res);
});

export default examRouter;