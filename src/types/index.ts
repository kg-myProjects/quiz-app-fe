export type Category = {
    id: string;
    title: string;
    totalQuestions: number;
    correctAnswers: number;
};

export type Question = {
    id: string;
    text: string;
    options: string[];
};

export interface AnswerRequest {
    selectedIndex: number;
}

export interface AnswerResponse {
    isCorrect: boolean;
}