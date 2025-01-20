import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import ReactMarkdown from 'react-markdown';
import followUpQuestionsData from './data/followUpQuestions.json';
import NeoIcon from './assets/askneo_icon.svg';

interface Message {
  type: 'user' | 'assistant';
  content: any;
  chart?: React.ReactNode;
  id: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showInitialQuestions, setShowInitialQuestions] = useState(true);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestedQuestionsRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (suggestedQuestionsRef.current) {
      setTimeout(() => {
        suggestedQuestionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showFollowUp]);

  const initialQuestions = [
    "How does the performance of different advertising platforms compare?",
    "How many orders were shipped to California in 2024?"
  ];

  // Remove the followUpQuestions object definition and use the imported data
  const followUpQuestions = followUpQuestionsData;
  const handleQuestionClick = async (question: string) => {
    setLoading(true);
    setShowInitialQuestions(false);
    
    if (questionCount === 0) {
      setMessages([]);
    }
    
    const userMessage: Message = {
      type: 'user',
      content: question,
      id: Date.now().toString()
    };
    setMessages(prev => [...prev, userMessage]);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response: Message = {
      type: 'assistant',
      content: <ReactMarkdown>{followUpQuestions[question]?.responses}</ReactMarkdown> ||
        "Based on our analysis, we've seen significant growth in this area. Let me break down the key metrics for you.",
      chart: <ReactECharts option={followUpQuestions[question]?.chartData} style={{ height: '400px' , width: '100%' }} />,
      id: (Date.now() + 1).toString()
    };

    setMessages(prev => [...prev, response]);
    setQuestionCount(prev => prev + 1);
    setLoading(false);
    
    if (questionCount === 0) {
      setShowFollowUp(true);
    }
  };

  const getRelevantFollowUps = (question: string) => {
      return followUpQuestions[question]?.questions || [];
  };

  const handleRestart = () => {
    setMessages([]);
    setShowInitialQuestions(true);
    setShowFollowUp(false);
    setQuestionCount(0);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-plus-jakarta">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 transition-all flex flex-col" style={{ height: '80vh' }}>
        {/* Header */}
        <div className="border-b px-4 py-3 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded">
              <img src={NeoIcon} alt="Neo Icon"/>
            </div>
            <span className="font-semibold text-gray-800">Ask Neo</span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm text-gray-600">
              <option>Select Collection</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ArrowUpRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8 pb-4">
            {showInitialQuestions && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h1 className="text-4xl font-light text-purple-400">Hi there !</h1>
                  <h2 className="text-3xl font-light">
                    Select a question to try <span className="text-orange-400">Ask Neo</span>
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {initialQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => !loading && handleQuestionClick(q)}
                      disabled={loading}
                      className="w-full text-left p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex justify-between items-center group disabled:opacity-50"
                    >
                      <span className="text-gray-700">{q}</span>
                      <ArrowUpRight 
                        size={18} 
                        className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
                >
                  <div className={`max-w-3xl ${message.type === 'user' ? 'bg-white' : 'bg-white'} rounded-lg p-4 shadow-sm border border-gray-100`}>
                    <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
                    {message.chart && (
                      <div className="mt-4 animate-fadeIn">
                        <hr className="my-8" />
                        {message.chart}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="h-3 w-3 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                      <div className="h-3 w-3 bg-orange-400 rounded-full animate-bounce delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Follow-up Questions */}
            {showFollowUp && questionCount < 2 && messages.length > 0 && !loading && (
              <div className="space-y-3 animate-fadeIn mt-8" ref={suggestedQuestionsRef}>
                <div className="flex items-center gap-2">
                 <img src={NeoIcon} alt="Neo Icon" />
                  <span className="text-gray-600">Suggested Questions</span>
                </div>
                {getRelevantFollowUps(messages[messages.length - 2].content).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => !loading && handleQuestionClick(q)}
                    disabled={loading}
                    className="w-full text-left p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex justify-between items-center group disabled:opacity-50"
                  >
                    <span className="text-gray-700">{q}</span>
                    <ArrowUpRight 
                      size={18} 
                      className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Restart Button */}
            {questionCount >= 2 && (
              <div className="flex justify-center animate-fadeIn mt-8">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-300 hover:shadow-md"
                >
                  Restart Chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ask anything input */}
        <div className="p-4 border-t flex-shrink-0">
          <button className="w-full text-left p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex justify-between items-center group">
            <span className="text-gray-400">Ask me anything about your Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;