import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { questions } from '../data/questions';

interface QuestionsProps {
  currentQuestion: number;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
}

function Questions({ currentQuestion, onAnswer, onPrevious }: QuestionsProps) {
  const question = questions[currentQuestion];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-8">
        {currentQuestion > 0 && (
          <button
            onClick={onPrevious}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-2xl font-semibold gradient-text">{question.text}</h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-6 rounded-xl border-2 border-transparent bg-white hover:border-indigo-600 hover:shadow-lg transition-all duration-300 group"
          >
            <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
              {option.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;