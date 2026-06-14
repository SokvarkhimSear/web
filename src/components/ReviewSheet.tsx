import React from 'react';
import { Card, Button } from './ui';
import { X } from 'lucide-react';

interface ReviewSheetProps {
  missedItems: { question: string; explanation: string }[];
  onClose: () => void;
  onClear: () => void;
}

export const ReviewSheet: React.FC<ReviewSheetProps> = ({ missedItems, onClose, onClear }) => {
  return (
    <div className="absolute inset-0 bg-primary/95 z-50 flex justify-center py-12 px-6 overflow-y-auto">
      <div className="w-full max-w-4xl relative">
        <button 
          onClick={onClose}
          className="absolute -right-4 -top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <Card className="border border-border-dark p-8 md:p-12 shadow-2xl">
          <div className="flex justify-between items-end mb-8 border-b border-border-dark pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Review Sheet</h2>
              <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">Missed Concepts Summary</p>
            </div>
            {missedItems.length > 0 && (
              <Button variant="outline" onClick={onClear}>Clear Review Sheet</Button>
            )}
          </div>

          {missedItems.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p>You haven't missed any topics yet. Keep up the good work!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {missedItems.map((item, idx) => (
                <div key={idx} className="bg-border-dark/30 p-6 border-l-4 border-accent-blue rounded-r">
                  <h3 className="font-semibold text-lg text-white mb-3">Topic: {item.question}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    <strong className="text-accent-teal uppercase tracking-wider text-xs mr-2 border-b border-accent-teal">Concept Note:</strong>
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
