import { Exam, ExamAttempt, User } from "@prisma/client"
import { ExamAttemptDTO } from "../types"

export class examAttemptMapper {
    static toDTO(examAttemptEntity:ExamAttempt, userEnity:User, examEntity:Exam):ExamAttemptDTO{
            return {
                id: examAttemptEntity.id,
                user:{
                    id: userEnity.id,
                    name: userEnity.name,
                    email: userEnity.email
                },
                exam:{
                    id: examEntity.id,
                    title: examEntity.title
                },
                status:examAttemptEntity.status,
                startTime: examAttemptEntity.startTime
            }
        }
        
        static toEntity(examAttemptDTO:ExamAttemptDTO):ExamAttempt{
            return{
                id: examAttemptDTO.id,
                examId: examAttemptDTO.exam.id,
                userId: examAttemptDTO.user.id,
                startTime: examAttemptDTO.startTime,
                status: examAttemptDTO.status
            }
        }
}