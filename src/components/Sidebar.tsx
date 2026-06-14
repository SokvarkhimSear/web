import React from 'react';
import { BookOpen, TerminalSquare, FileText, CheckCircle2 } from 'lucide-react';
import { EditorChallenge, QuizQuestion } from '../types';

interface SidebarProps {
  currentMode: 'quiz' | 'editor';
  setCurrentMode: (mode: 'quiz' | 'editor') => void;
  quizScore: number;
  totalQuiz: number;
  completedChallenges: string[];
  totalChallenges: number;
  onGenerateReview: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMode,
  setCurrentMode,
  quizScore,
  totalQuiz,
  completedChallenges,
  totalChallenges,
  onGenerateReview
}) => {
  const overallProgress = Math.round(((quizScore + completedChallenges.length) / (totalQuiz + totalChallenges)) * 100) || 0;

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-border-dark flex flex-col p-4 h-full">
      <div className="mb-8">
        <h1 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Course Portal</h1>
        <p className="text-lg font-semibold text-white">INFO 250: Web Dev I</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs text-gray-400">Overall Progress</span>
          <span className="text-sm font-bold text-accent-blue">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-accent-blue h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto scroll-hide">
        <div className="space-y-1">
          <p className="text-[10px] uppercase text-gray-600 font-bold mb-2">Module Stats</p>
          <div className="flex justify-between items-center p-2 rounded bg-gray-800/50 text-xs border border-border-dark mb-2">
             <span className="text-gray-300">Quiz Completion</span>
             <span className="mono text-accent-teal">{quizScore}/{totalQuiz}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-gray-800/50 text-xs border border-border-dark">
             <span className="text-gray-300">Editor Challenges</span>
             <span className="mono text-accent-teal">{completedChallenges.length}/{totalChallenges}</span>
          </div>
        </div>
      </nav>

      <div className="mt-4 pt-4 border-t border-border-dark">
        <button
          onClick={onGenerateReview}
          className="w-full py-2 px-3 text-[10px] font-bold uppercase tracking-wider border border-border-dark hover:bg-gray-800 rounded transition-colors text-white"
        >
          Generate Review Sheet
        </button>
      </div>
    </aside>
  );
};
