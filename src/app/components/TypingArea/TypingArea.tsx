import React, { useState, useEffect, useRef, useCallback } from 'react';

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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    }, [text, startTime, onProgressUpdate]);

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

    const renderHighlightedText = useCallback(() => {
        return text.split('').map((char, index) => {
            let color = 'text-gray-700';
            if (index < input.length) {
                color = input[index] === char ? 'text-green-500' : 'text-red-500';
            }
            return (
                <span key={index} className={color}>
                    {char}
                </span>
            );
        });
    }, [text, input]);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p className="text-lg">{renderHighlightedText()}</p>
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
