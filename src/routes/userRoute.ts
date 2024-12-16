import { Request, Response, Router } from "express";
import { userController } from "../controllers/userController";

const userRouter:Router = Router();

userRouter.post('', async (req:Request, res: Response) => {
    userController.createUser(req,res);
});

export default userRouter;