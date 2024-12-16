
export interface UserDTO {
    id: number,
    name: string,
    email: string
}

export interface ExamDTO {
    id: number,
    title: string
}

export interface QuestionDTO {
    id: number,
    exam: ExamDTO
    text: string
    type: string
    options: string[]
}

export interface AnswerDTO {
    id: number,
    attempt: ExamAttemptDTO
    question: QuestionDTO
    answer: string
    createdAt: Date
}

export interface ExamAttemptDTO {
    id: number,
    exam: ExamDTO,
    user: UserDTO,
    startTime: Date
    status:string;
}

export interface ServerMessage {
    status: number,
    message: any,
}
