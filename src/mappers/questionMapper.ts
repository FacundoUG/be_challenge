import { Exam, Question } from "@prisma/client";
import { QuestionDTO } from "../types";

export class questionMapper{
    static toDTO(questionEntity:Question, examEntity:Exam):QuestionDTO{
        return{
            id:questionEntity.id,
            exam: {
                id: examEntity.id,
                title: examEntity.title
            },
            text: questionEntity.text,
            type: questionEntity.type,
            options: JSON.parse(questionEntity.options)
        }
    }
    static toEntity(questionDTO:QuestionDTO):Question{
        return{
            id: questionDTO.id,
            examId: questionDTO.exam.id,
            text: questionDTO.text,
            type: questionDTO.type,
            options: JSON.stringify(questionDTO.options)
        }
    }
}