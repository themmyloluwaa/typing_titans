'use client'

import { useState, useEffect, useRef } from 'react';
import { createClient } from "@/utils/supabase/client";
import TypingArea from "@/app/components/TypingArea";
import ResultsDisplay from "@/app/components/ResultsDisplay";
import { User } from '@supabase/supabase-js';
import CarProgress from "@/app/components/CarProgress";

export default function PracticePage() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [practiceText, setPracticeText] = useState("");
    const [results, setResults] = useState(null);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [progress, setProgress] = useState(0);
    const supabase = createClient();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/audio/detective.mp3');
            audioRef.current.loop = true; // Make the audio loop
            audioRef.current.volume = 0.5; // Set volume to 50%
            const playAudio = () => {
                audioRef.current?.play().catch(error => {
                    console.error("Error playing audio:", error);
                    // Retry playing after a short delay
                    setTimeout(playAudio, 1000);
                });
            };
            playAudio();
        }

        // Cleanup function to stop audio when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        const checkUser = () => {
            supabase.auth.getUser().then(({ data: { user } }) => {
                setUser(user || null);
                setIsLoading(false);
            });
        };

        checkUser();
    }, [supabase]);

    useEffect(() => {
        fetchPracticeText();
    }, [level]);

    const fetchPracticeText = () => {
        // Replace this with actual API call that considers the current level
        const texts = [
            "The quick brown fox jumps over the lazy dog.",
            "A journey of a thousand miles begins with a single step.",
            "To be or not to be, that is the question.",
            "All that glitters is not gold.",
            "Where there's a will, there's a way."
        ];
        const text = texts[Math.min(level - 1, texts.length - 1)];
        // Increase difficulty by adding more words based on the level
        const repeatedText = (text + ' ').repeat(level).trim();
        setPracticeText(repeatedText);
        setProgress(0);
    };

    const handleTypingComplete = (typingResults: any) => {
        setResults(typingResults);
        updateGameState(typingResults);
    };

    const updateGameState = (typingResults: any) => {
        const newScore = score + (typingResults.accuracy * typingResults.wpm);
        setScore(Math.round(newScore));

        if (typingResults.accuracy > 95 && typingResults.wpm > (30 + level * 5)) {
            setLevel(prevLevel => prevLevel + 1);
            setStreak(prevStreak => prevStreak + 1);
        } else {
            setStreak(0);
        }
    };

    const handleNextLevel = () => {
        setResults(null);
        fetchPracticeText();
        // The score is not reset here, it accumulates across levels
    };

    const handleTryAgain = () => {
        setResults(null);
        setProgress(0);
        // We don't need to fetch new text, just reset the progress
    };

    const handleProgressUpdate = (currentProgress: number, exactMatch: boolean) => {
        if (exactMatch) {
            setProgress(currentProgress);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please sign in to access the practice area.</div>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Typing Titans Practice Arena</h1>
            <div className="flex justify-between mb-4">
                <div>Level: {level}</div>
                <div>Score: {score}</div>
                <div>Streak: {streak}</div>
            </div>
            <CarProgress progress={progress} />
            {!results ? (
                <TypingArea 
                    text={practiceText} 
                    onComplete={handleTypingComplete} 
                    onProgressUpdate={handleProgressUpdate}
                />
            ) : (
                <>
                    <ResultsDisplay results={results} onTryAgain={handleTryAgain} />
                    <button 
                        onClick={handleNextLevel}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next Level
                    </button>
                </>
            )}
        </main>
    );
}
