import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import Questions from './components/Questions';
import Result from './components/Result';
import Welcome from './components/Welcome';
import { calculateMBTI } from './utils/mbtiCalculator';
import { Answer } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questions' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState('');

  const handleStart = () => {
    setCurrentStep('questions');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, { questionId: currentQuestion + 1, answer }];
    setAnswers(newAnswers);

    if (currentQuestion === 19) {
      const mbtiResult = calculateMBTI(newAnswers);
      setResult(mbtiResult);
      setCurrentStep('result');
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="flex items-center justify-center mb-12">
          <div className="animate-float">
            <Brain className="w-12 h-12 text-indigo-600 mr-3" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">MBTI Personality Test</h1>
        </header>

        <main className="glass-effect rounded-2xl shadow-xl p-8 animate-fadeIn">
          {currentStep === 'welcome' && (
            <Welcome onStart={handleStart} />
          )}

          {currentStep === 'questions' && (
            <Questions
              currentQuestion={currentQuestion}
              onAnswer={handleAnswer}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 'result' && (
            <Result
              result={result}
              onRestart={handleRestart}
            />
          )}

          {currentStep === 'questions' && (
            <div className="mt-8">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of 20</span>
                <span>{Math.round(((currentQuestion + 1) / 20) * 100)}%</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;