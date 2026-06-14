import React, { useState, useEffect, useRef } from 'react';
import { EditorChallenge } from '../types';
import { editorChallenges } from '../data/editorData';
import { Button } from './ui';
import { CheckCircle2, AlertTriangle, ChevronRight, Play } from 'lucide-react';

export const Editor: React.FC<{
  onCompleteChallenge: (id: string) => void;
  completedChallenges: string[];
}> = ({ onCompleteChallenge, completedChallenges }) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [validationResult, setValidationResult] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const challenge = editorChallenges[currentChallengeIndex];

  useEffect(() => {
    setCode(challenge.initialCode);
    setValidationResult({ status: 'idle', message: '' });
  }, [currentChallengeIndex]);

  useEffect(() => {
    const renderSandbox = () => {
      if (!iframeRef.current) return;
      
      const doc = iframeRef.current.contentDocument;
      if (!doc) return;
      
      doc.open();
      // Ensure the sandbox has the same base styling roughly for fonts if applicable, though it should be raw for tests
      doc.write(`
        <html>
        <head>
          <style>
            body { font-family: ui-sans-serif, system-ui, sans-serif; background: #ffffff; color: #1e1e24; margin: 0; padding: 1rem; border: 1px dashed #cccccc; }
          </style>
        </head>
        <body>
          ${code}
        </body>
        </html>
      `);
      doc.close();
    };

    const timer = setTimeout(renderSandbox, 300);
    return () => clearTimeout(timer);
  }, [code]);

  const handleValidate = () => {
    let result = challenge.validator(code);
    if (result === true) {
      setValidationResult({ status: 'success', message: 'Perfect! Code passes all structural requirements.' });
      onCompleteChallenge(challenge.id);
    } else if (typeof result === 'string') {
      setValidationResult({ status: 'error', message: result });
    } else {
      setValidationResult({ status: 'error', message: challenge.validationMessage });
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      
      {/* Top Challenge Navigation */}
      <div className="bg-sidebar border-b border-border-dark flex items-center justify-between p-3 shrink-0">
        <select 
          className="bg-primary text-gray-200 border border-border-dark px-2 py-1.5 text-xs max-w-sm rounded focus:outline-none focus:border-accent-blue"
          value={currentChallengeIndex}
          onChange={(e) => setCurrentChallengeIndex(Number(e.target.value))}
        >
          {editorChallenges.map((chal, idx) => (
             <option key={chal.id} value={idx}>
               {chal.title} {completedChallenges.includes(chal.id) ? '✓' : ''}
             </option>
          ))}
        </select>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setCode(challenge.initialCode);
              setValidationResult({ status: 'idle', message: '' });
            }}
          >
            Reset Code
          </Button>
          <Button onClick={handleValidate}>
            Validate Code
          </Button>
        </div>
      </div>

      {/* Challenge Description */}
      <div className="bg-primary p-4 shrink-0 border-b border-border-dark">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-[10px] font-bold rounded">TASK {currentChallengeIndex + 1}</span>
          <h2 className="text-sm font-semibold">{challenge.title}</h2>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed max-w-5xl">Objective: {challenge.description}</p>
      </div>

      {/* Verification Status */}
      {validationResult.status !== 'idle' && (
        <div className={`shrink-0 p-4 font-mono text-sm border-b ${validationResult.status === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
          <div className="flex items-start gap-3">
             {validationResult.status === 'success' ? <CheckCircle2 size={18} className="mt-0.5" /> : <AlertTriangle size={18} className="mt-0.5" />}
             <div>
               <div className="uppercase tracking-widest text-xs font-bold mb-1">
                 {validationResult.status === 'success' ? 'Validation Passed' : 'Validation Failed'}
               </div>
               <span>{validationResult.message}</span>
             </div>
          </div>
        </div>
      )}

      {/* Split Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Editor Left */}
        <div className="w-1/2 flex flex-col border-r border-border-dark overflow-hidden bg-editor relative">
           <div className="text-[10px] uppercase tracking-widest text-gray-500 p-2 border-b border-border-dark bg-sidebar">
              Workspace / editor.html
           </div>
           <textarea
             className="flex-1 w-full p-4 bg-transparent text-gray-200 mono text-sm leading-relaxed resize-none scroll-hide focus:outline-none"
             value={code}
             onChange={(e) => setCode(e.target.value)}
             spellCheck={false}
           />
        </div>

        {/* Sandbox Right */}
        <div className="w-1/2 bg-gray-950 flex flex-col relative overflow-hidden">
           <div className="h-8 bg-gray-800 flex items-center px-4 gap-2 border-b border-border-dark shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <div className="flex-1 bg-gray-900 rounded-sm mx-4 h-4 text-[9px] flex items-center px-2 text-gray-500 mono">
                 localhost:3000/sandbox
              </div>
           </div>
           <iframe
             title="Sandbox"
             ref={iframeRef}
             className="w-full flex-1 border-none outline-none bg-white"
             sandbox="allow-scripts allow-same-origin"
           />
        </div>

      </div>

    </div>
  );
}
