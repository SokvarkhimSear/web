import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { quizQuestions } from '../data/quizData';
import { Button, Card } from './ui';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Quiz: React.FC<{
  onScoreUpdate: (score: number) => void;
  recordMiss: (questionText: string, explanation: string) => void;
}> = ({ onScoreUpdate, recordMiss }) => {
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Randomize 10 questions from the pool
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 10));
  }, []);

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || hasAnswered) return;
    
    setHasAnswered(true);
    const q = currentQuestions[currentIndex];
    
    if (selectedOption === q.correctAnswerIndex) {
      setScore(s => {
        const newScore = s + 1;
        onScoreUpdate(newScore);
        return newScore;
      });
    } else {
      recordMiss(q.question, q.explanation);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
    onScoreUpdate(0);
  };

  if (currentQuestions.length === 0) return <div className="p-8 text-center text-gray-400">Loading quiz...</div>;

  if (isFinished) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <Card className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 font-sans tracking-tight">Quiz Completed</h2>
          <div className="text-5xl font-mono text-accent-blue mb-6 border-b border-border-dark pb-6">
            {score} / {currentQuestions.length}
          </div>
          <p className="text-gray-300 mb-8">
            You can review any missed concepts in your Review Sheet, or restart to test your knowledge again.
          </p>
          <Button onClick={handleRestart} className="w-full">Restart Quiz</Button>
        </Card>
      </div>
    );
  }

  const question = currentQuestions[currentIndex];

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto w-full h-full">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between mono text-[10px] tracking-widest text-gray-400 mb-6 font-bold uppercase">
          <span>MODULE {question.module}</span>
          <span>QUESTION {currentIndex + 1} OF {currentQuestions.length}</span>
        </div>

        <h2 className="text-xl font-semibold mb-6 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3 mb-6 flex-1 text-sm">
          {question.options.map((option, idx) => {
            let itemClass = "w-full text-left p-3 rounded border transition-all text-sm tracking-wide flex justify-between items-center bg-sidebar ";
            if (!hasAnswered) {
               itemClass += selectedOption === idx ? "border-accent-blue bg-accent-blue/10" : "border-border-dark hover:border-gray-500 bg-primary";
            } else {
               if (idx === question.correctAnswerIndex) {
                 itemClass += "border-green-500 bg-green-500/10 text-green-400";
               } else if (idx === selectedOption) {
                 itemClass += "border-red-500 bg-red-500/10 text-red-400 opacity-70";
               } else {
                 itemClass += "border-border-dark opacity-50";
               }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasAnswered}
                className={itemClass}
              >
                <span>{option}</span>
                {hasAnswered && idx === question.correctAnswerIndex && <CheckCircle2 size={16} className="text-green-500 shrink-0 ml-4" />}
                {hasAnswered && idx === selectedOption && idx !== question.correctAnswerIndex && <XCircle size={16} className="text-red-500 shrink-0 ml-4" />}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className={`p-4 rounded border-l-2 mb-6 text-xs leading-relaxed ${selectedOption === question.correctAnswerIndex ? 'bg-green-500/10 border-green-500 text-green-100' : 'bg-border-dark border-accent-blue text-gray-200'}`}>
            <span className="font-bold flex items-center gap-2 mb-1 uppercase tracking-wider text-[10px]">
               Explanation
            </span>
            {question.explanation}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-border-dark mt-auto shrink-0">
          {!hasAnswered ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
