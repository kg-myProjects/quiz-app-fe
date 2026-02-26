import {AnswerRequest, AnswerResponse, Category, Question} from "@/types";
import axiosInstance from "@/lib/axiosInstance";

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>("categories");
    return response.data;
};

export const fetchNextQuestion = async (
    categoryId: string,
    currentQuestionId?: string
): Promise<Question | null> => {

    const response = await axiosInstance.get<Question>(`/categories/${categoryId}/next-question`,
        {
            params: {currentQuestionId}
        });

    if (response.status === 204 || !response.data) {
        return null;
    }

    return response.data;
};

export const submitAnswer = async (questionId: string, answer: AnswerRequest): Promise<AnswerResponse> => {
    const response = await axiosInstance.post<AnswerResponse>(`/questions/${questionId}/answer`, answer)
    return response.data;
};