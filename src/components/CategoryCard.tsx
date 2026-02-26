import React from "react";
import {Category} from "@/types";

interface CategoryCardProps {
    category: Category;
    onStart: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category, onStart}) => {
    const progress = category.totalQuestions
        ? Math.round((category.correctAnswers / category.totalQuestions) * 100)
        : 0;

    const handleClick = () => {
        onStart(category.id);
    };

    return (
        <div className="mb-4 p-4 border rounded">
            <div className="flex justify-between mb-2">
                <span className="font-medium">{category.title}</span>
                <span className="text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded h-4 mb-2">
                <div
                    className="bg-green-800 h-4 rounded"
                    style={{width: `${progress}%`}}
                ></div>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-green-800 text-white px-4 py-2 rounded cursor-pointer hover:scale-110"
                    onClick={handleClick}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;