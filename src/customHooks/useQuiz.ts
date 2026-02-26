import {useCallback, useState} from "react";
import {AnswerRequest, Category, Message, MessageType, Question} from "@/types";
import {fetchCategories, fetchNextQuestion, submitAnswer} from "@/lib/api";

export const useQuiz = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answerMessage, setAnswerMessage] = useState<Message | null>(null);
    const [infoMessage, setInfoMessage] = useState<Message | null>(null);

    const showMessage = (text: string, type: MessageType = "info", duration = 1500) => {
        const setter =
            type === "success" || type === "error"
                ? setAnswerMessage
                : setInfoMessage;

        setter({text, type});
        setTimeout(() => setter(null), duration);
    };

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

    const loadNextQuestion = async (
        categoryId: string,
        currentQuestionId?: string
    ): Promise<boolean> => {
        try {
            const question = await fetchNextQuestion(
                categoryId,
                currentQuestionId
            );

            if (question === null) {
                setCurrentQuestion(null);
                showMessage(
                    "All questions completed in this category",
                    "info"
                );
                return false;
            }

            setCurrentQuestion(null);
            setTimeout(() => setCurrentQuestion(question), 100);
            return true;
        } catch (err) {
            console.error(err);
            showMessage("Failed to load question", "error");
            return false;
        }
    };

    const startQuiz = async (categoryId: string) => {
        setCurrentCategoryId(categoryId);
        await loadNextQuestion(categoryId);
    };

    const handleSelectAnswer = async (index: number) => {
        if (!currentQuestion || !currentCategoryId) return;

        try {
            const answer: AnswerRequest = {selectedIndex: index};
            const response = await submitAnswer(currentQuestion.id, answer);

            showMessage(
                response.isCorrect ? "Correct!" : "Wrong!",
                response.isCorrect ? "success" : "error"
            );

            await loadNextQuestion(
                currentCategoryId,
                currentQuestion.id
            );

            await loadCategories();
        } catch (err) {
            console.error(err);
            showMessage("Failed to submit answer", "error");
        }
    };

    const endQuiz = () => {
        setCurrentQuestion(null);
        setCurrentCategoryId(null);
    };

    return {
        categories,
        currentQuestion,
        loadCategories,
        loading,
        error,
        answerMessage,
        infoMessage,
        startQuiz,
        handleSelectAnswer,
        endQuiz,
    };
};