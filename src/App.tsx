/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Quiz } from './components/Quiz';
import { Editor } from './components/Editor';
import { ReviewSheet } from './components/ReviewSheet';
import { editorChallenges } from './data/editorData';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'quiz' | 'editor'>('quiz');
  const [quizScore, setQuizScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [missedItems, setMissedItems] = useState<{question: string, explanation: string}[]>([]);
  const [showReview, setShowReview] = useState(false);

  const handleCompleteChallenge = (id: string) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges(prev => [...prev, id]);
    }
  };

  const handleRecordMiss = (questionText: string, explanation: string) => {
    setMissedItems(prev => {
      // Avoid duplicates
      if (prev.some(item => item.question === questionText)) return prev;
      return [...prev, { question: questionText, explanation }];
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-primary)] text-[var(--color-text-light)]">
      <Sidebar 
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        quizScore={quizScore}
        totalQuiz={10} // Fixed to 10 mapped in Quiz.tsx
        completedChallenges={completedChallenges}
        totalChallenges={editorChallenges.length}
        onGenerateReview={() => setShowReview(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden bg-[var(--color-primary)]">
        {/* HEADER / TABS */}
        <header className="h-14 border-b border-border-dark flex items-center px-6 justify-between bg-sidebar/50 shrink-0">
          <div className="flex items-center gap-6 h-full">
            <button 
              onClick={() => setCurrentMode('quiz')}
              className={`text-sm font-medium h-full border-b-2 transition-colors ${currentMode === 'quiz' ? 'text-white border-accent-blue' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
            >
              Quiz Module
            </button>
            <button 
              onClick={() => setCurrentMode('editor')}
              className={`text-sm font-medium h-full border-b-2 transition-colors ${currentMode === 'editor' ? 'text-white border-accent-blue' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
            >
              Code Practice
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">System <span className="text-green-500 ml-1">Online</span></div>
            <div className="px-2 py-1 bg-gray-800 rounded text-[10px] mono border border-border-dark text-gray-400">Compiler v1.4.2</div>
          </div>
        </header>

        <div className="flex-1 relative flex flex-col overflow-hidden">
          {currentMode === 'quiz' ? (
            <Quiz 
              onScoreUpdate={setQuizScore} 
              recordMiss={handleRecordMiss}
            />
          ) : (
            <Editor 
              onCompleteChallenge={handleCompleteChallenge}
              completedChallenges={completedChallenges}
            />
          )}

          {showReview && (
            <ReviewSheet 
              missedItems={missedItems} 
              onClose={() => setShowReview(false)} 
              onClear={() => setMissedItems([])} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
