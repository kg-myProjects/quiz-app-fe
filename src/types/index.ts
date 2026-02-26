export type MessageType = "success" | "error" | "info";

export interface Category {
    id: string;
    title: string;
    totalQuestions: number;
    correctAnswers: number;
}

export interface Question {
    id: string;
    text: string;
    options: string[];
}

export interface AnswerRequest {
    selectedIndex: number;
}

export interface AnswerResponse {
    isCorrect: boolean;
}

export interface Message {
    text: string;
    type: MessageType;
}