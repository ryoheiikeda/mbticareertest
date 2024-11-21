import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="text-center">
      <div className="inline-block animate-float mb-8">
        <Sparkles className="w-16 h-16 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold gradient-text mb-6">パーソナリティ診断テスト</h2>
      <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
        このMBTI性格診断テストで、あなたの性格タイプを見つけましょう。
        20個の質問に正直に答えることで、詳細なパーソナリティプロファイルが分かります。
      </p>
      <button
        onClick={onStart}
        className="button-gradient text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <span className="flex items-center">
          テストを始める
          <ArrowRight className="ml-2 w-5 h-5" />
        </span>
      </button>
    </div>
  );
}

export default Welcome;