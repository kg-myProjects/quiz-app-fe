import {useEffect} from "react";
import CategoryCard from "@/components/CategoryCard";
import QuestionCard from "@/components/QuestionCard";
import {useQuiz} from "@/customHooks/useQuiz";

export default function Home() {
    const {
        categories,
        loading,
        error,
        currentQuestion,
        loadCategories,
        goToNextQuestion,
        handleSelectAnswer,
        handleEndQuiz
    } = useQuiz();

    useEffect(() => {
        void loadCategories();
    }, [loadCategories]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen text-3xl">
                <p>Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-3xl">
                <p>{error}</p>
            </div>
        );

    return (
        <div className="p-8 w-full">
            <h1 className="text-3xl font-bold mb-20 text-center">Welcome to Quiz</h1>
            <div className="flex gap-8 justify-center">
                <div className="w-[35%]">
                    <h1 className="text-2xl font-bold mb-6">Categories:</h1>
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} onStart={goToNextQuestion}/>
                    ))}
                </div>

                <div className="flex w-[35%] items-center justify-center" >
                    <div className="flex-1">
                        {currentQuestion && (
                            <QuestionCard question={currentQuestion} onSelectAnswer={handleSelectAnswer}
                                          onEndQuiz={handleEndQuiz}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}