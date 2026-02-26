import {Question} from "@/types";

interface QuestionCardProps {
    question: Question;
    onSelectAnswer: (index: number) => void;
    onEndQuiz: () => void;
}

export default function QuestionCard({question, onSelectAnswer, onEndQuiz}: QuestionCardProps) {
    return (
        <div className="flex flex-col mt-8 p-4 h-[400px] border rounded bg-gray-50">
            <h2 className="font-bold text-lg text-black mb-2">{question.text}</h2>
            <ul className="space-y-2">
                {question.options.map((option: string, idx: number) => (
                    <li
                        key={idx}
                        className="p-2 border rounded text-slate-700 hover:bg-green-800 hover:text-white cursor-pointer"
                        onClick={() => onSelectAnswer(idx)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            <div className="flex justify-end mt-auto">
                <button
                    onClick={onEndQuiz}
                    className="bg-red-800 text-white px-4 py-2 mt-2 rounded cursor-pointer hover:scale-110"
                >
                    End Quiz
                </button>
            </div>
        </div>
    );
}