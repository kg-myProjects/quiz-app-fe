import {useCallback, useState} from "react";
import {AnswerRequest, Category, Question} from "@/types";
import {fetchCategories, fetchNextQuestion, submitAnswer} from "@/lib/api";
import {AxiosError} from "axios";

export const useQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

    const loadCategories = useCallback(async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    }, []);

    const goToNextQuestion = async (categoryId: string) => {
        setCurrentCategoryId(categoryId);
        try {
            const question = await fetchNextQuestion(categoryId);
            setCurrentQuestion(question);
        } catch (err: unknown) {
            if (err instanceof AxiosError && err.response?.status === 404) {
                alert("No more questions available in this category.");
            } else {
                console.error(err);
                alert("Failed to load question");
            }
        }
    };

    const handleSelectAnswer = async (index: number) => {
        if (!currentQuestion || !currentCategoryId) return;

        try {
            const answer: AnswerRequest = {selectedIndex: index};
            const response = await submitAnswer(currentQuestion.id, answer);
            alert(response.isCorrect ? "Correct!" : "Wrong!");

            try {
                const nextQuestion = await fetchNextQuestion(currentCategoryId, currentQuestion.id);
                setCurrentQuestion(nextQuestion);
            } catch (err) {
                if (err instanceof AxiosError && err.response?.status === 404) {
                    setCurrentQuestion(null);
                    alert("No more questions available in this category.");
                } else {
                    console.error(err);
                    alert("Failed to load question");
                }
            }
            await loadCategories();
        } catch (err) {
            console.error(err);
            alert("Failed to submit answer");
        }
    };

    const handleEndQuiz = () => {
        setCurrentQuestion(null);
        setCurrentCategoryId(null);
    };

    return {
        categories,
        loading,
        error,
        currentQuestion,
        loadCategories,
        goToNextQuestion,
        handleSelectAnswer,
        handleEndQuiz,
    };
};