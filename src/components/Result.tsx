import React, { useState } from 'react';
import { RefreshCw, Lock } from 'lucide-react';
import { mbtiDescriptions } from '../data/mbtiDescriptions';
import CareerConsultation from './CareerConsultation';

interface ResultProps {
  result: string;
  onRestart: () => void;
}

function Result({ result, onRestart }: ResultProps) {
  const [showConsultation, setShowConsultation] = useState(false);
  const description = mbtiDescriptions[result];

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">あなたの性格タイプ</h2>
        <div className="text-5xl font-bold text-gray-800 mb-6">{result}</div>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{description.title}</h3>
          <p className="text-gray-600 mb-6">{description.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-left mb-8">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">強み</h4>
              <ul className="list-disc list-inside text-gray-600">
                {description.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">価値観</h4>
              <ul className="list-disc list-inside text-gray-600">
                {description.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </div>

          {!showConsultation && (
            <button
              onClick={() => setShowConsultation(true)}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-6"
            >
              専門家による精密診断を受ける
              <Lock className="ml-2 w-5 h-5" />
            </button>
          )}

          {showConsultation && (
            <CareerConsultation mbtiType={result} />
          )}

          <div className="mt-8">
            <button
              onClick={onRestart}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              テストをもう一度受ける
              <RefreshCw className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;