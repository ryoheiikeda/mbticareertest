import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

interface CareerConsultationProps {
  mbtiType: string;
}

function CareerConsultation({ mbtiType }: CareerConsultationProps) {
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [concerns, setConcerns] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConsultation = async () => {
    if (!apiKey) {
      setError('APIキーを入力してください');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "あなたはキャリアカウンセラーです。MBTIの結果と個人情報に基づいて、具体的なキャリアアドバイスを提供してください。"
          },
          {
            role: "user",
            content: `
              MBTI: ${mbtiType}
              年齢: ${age}歳
              現在の職業: ${occupation}
              現状の悩み: ${concerns}
              
              上記の情報に基づいて、具体的なキャリアアドバイスをお願いします。
            `
          }
        ]
      });

      setAdvice(response.choices[0]?.message?.content || '申し訳ありません。アドバイスを生成できませんでした。');
    } catch (err) {
      setError('エラーが発生しました。APIキーを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">キャリア診断</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            年齢
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="例: 25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            現在の職業
          </label>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="例: システムエンジニア"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            現状の悩み
          </label>
          <textarea
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="現在抱えている悩みや課題を入力してください"
          />
        </div>

        {!showApiInput ? (
          <button
            onClick={() => setShowApiInput(true)}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            診断を開始する
          </button>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI APIキー
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              placeholder="sk-..."
            />
            <button
              onClick={handleConsultation}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  診断中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  アドバイスを取得
                </span>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {advice && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">キャリアアドバイス</h4>
            <p className="text-gray-600 whitespace-pre-line">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerConsultation;