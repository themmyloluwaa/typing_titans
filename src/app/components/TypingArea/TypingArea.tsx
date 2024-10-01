import React, { useState, useEffect, useRef } from 'react';

interface TypingAreaProps {
    text: string;
    onComplete: (results: {
        wpm: number;
        accuracy: number;
        time: number;
    }) => void;
    onProgressUpdate: (progress: number, exactMatch: boolean) => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, onComplete, onProgressUpdate }) => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);

        if (!startTime) {
            setStartTime(Date.now());
        }

        // Calculate and update progress based on correct characters with exact match
        const correctChars = value.split('').filter((char, index) => char === text[index]).length;
        const progress = (correctChars / text.length) * 100;
        const exactMatch = value === text.slice(0, value.length);
        onProgressUpdate(progress, exactMatch);

        if (value === text) {
            setEndTime(Date.now());
        }
    };

    useEffect(() => {
        if (endTime && startTime) {
            const time = (endTime - startTime) / 1000; // in seconds
            const words = text.trim().split(/\s+/).length;
            const wpm = Math.round((words / time) * 60);
            const accuracy = calculateAccuracy(text, input);

            onComplete({ wpm, accuracy, time });
        }
    }, [endTime, startTime, text, input, onComplete]);

    const calculateAccuracy = (original: string, typed: string): number => {
        let correct = 0;
        for (let i = 0; i < Math.min(original.length, typed.length); i++) {
            if (original[i] === typed[i]) correct++;
        }
        return Math.round((correct / original.length) * 100);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p className="text-lg">{text}</p>
            </div>
            <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Start typing here..."
            />
        </div>
    );
};

export default TypingArea;
