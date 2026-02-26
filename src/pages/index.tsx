import {useEffect} from "react";
import CategoryCard from "@/components/CategoryCard";
import QuestionCard from "@/components/QuestionCard";
import {useQuiz} from "@/customHooks/useQuiz";
import MessageContainer from "@/components/MessageContainer";

export default function Home() {
    const {
        categories,
        currentQuestion,
        loadCategories,
        loading,
        error,
        answerMessage,
        infoMessage,
        startQuiz,
        handleSelectAnswer,
        endQuiz
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
        <>
            <header className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-center my-10">Welcome to Quiz</h1>
                <section className="flex flex-col items-center">
                    <div className="h-[50px] w-[400px]">
                        <MessageContainer message={answerMessage}/>
                    </div>
                    <div className="h-[50px] w-[400px] mt-1">
                        <MessageContainer message={infoMessage}/>
                    </div>
                </section>
            </header>

            <main className="p-8 w-full flex justify-center gap-8">
                <section className="w-[35%]">
                    <h2 className="text-2xl font-bold mb-6">Categories:</h2>
                    {categories.map(cat => (
                        <CategoryCard key={cat.id} category={cat} onStart={startQuiz}/>
                    ))}
                </section>
                <section className="flex w-[35%] items-center justify-center">
                    <div className="flex-1">
                        {currentQuestion && (
                            <QuestionCard
                                question={currentQuestion}
                                onSelectAnswer={handleSelectAnswer}
                                onEndQuiz={endQuiz}
                            />
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}