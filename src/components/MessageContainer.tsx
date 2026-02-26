import {Message} from "@/types";

interface MessageContainerProps {
    message: Message | null;
}

export default function MessageContainer({message}: MessageContainerProps) {

    let bgColor = "bg-gray-100 text-black border-gray-400";
    if (message?.type === "error") bgColor = "bg-red-100 text-red-800 border-red-400";
    if (message?.type === "success") bgColor = "bg-green-100 text-green-800 border-green-400";

    return (
        <div
            className={`mb-4 border rounded text-center shadow overflow-hidden
                transition-all duration-500 ease-in-out ${
                message ? `${bgColor} opacity-100 max-h-40 p-2` : "opacity-0 max-h-0 p-0 border-0"
            }`}
        >
            {message?.text}
        </div>
    );
}