import { Exam } from "@prisma/client";
import { ExamDTO } from "../types";


export class examMapper {
    static toDTO(examEntity:Exam):ExamDTO{
        return {
            id: examEntity.id,
            title: examEntity.title
        }
    }
    
    static toEntity(examDTO:ExamDTO):Exam{
        return{
            id: examDTO.id,
            title: examDTO.title
        }
    }
}