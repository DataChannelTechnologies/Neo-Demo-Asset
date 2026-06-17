import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  PanelLeft,
  Settings,
  MessageSquare,
  FolderKanban,
  Database,
  Search,
  Plus,
  RotateCcw,
  Sliders,
  ArrowUpRight,
  Folder,
  Zap,
  Sun,
  MoreHorizontal,
  Pencil,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import ReactMarkdown from "react-markdown";

import followUpQuestionsData from "./data/followUpQuestions.json";

import NeoLogo from "./assets/neo-logo.svg";
import NeoIconChat from "./assets/neo_icon_chat.png";
import InteractNudge from "./assets/interact_nudge.png";
import UserIcon from "./assets/USER.png";

interface Message {
  type: "user" | "assistant";
  content: any;
  chart?: React.ReactNode;
  id: string;
}

interface FollowUpQuestions {
  [key: string]: {
    responses: string;
    chartData: any;
    questions: string[];
  };
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showFollowUp, loading]);

  const initialQuestions = [
    "How does the performance of different advertising platforms compare?",
    "How many orders were shipped to California in 2024?",
  ];

  const followUpQuestions: FollowUpQuestions = followUpQuestionsData;

  const handleQuestionClick = async (question: string) => {
    setLoading(true);

    const userMessage: Message = {
      type: "user",
      content: question,
      id: Date.now().toString(),
    };

    const updatedUserMessages = [...messages, userMessage];
    setMessages(updatedUserMessages);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responseContent =
      followUpQuestions[question]?.responses ||
      "Based on our analysis, we've seen significant growth.";

    const chartComponent = followUpQuestions[question]?.chartData ? (
      <ReactECharts
        option={followUpQuestions[question]?.chartData}
        opts={{ renderer: "svg" }}
        style={{ height: "320px", width: "100%" }}
      />
    ) : undefined;

    const response: Message = {
      type: "assistant",
      content: <ReactMarkdown>{responseContent}</ReactMarkdown>,
      chart: chartComponent,
      id: (Date.now() + 1).toString(),
    };

    const finalMessages = [...updatedUserMessages, response];
    setMessages(finalMessages);

    const nextQuestionCount = questionCount + 1;
    setQuestionCount(nextQuestionCount);
    const nextShowFollowUp = nextQuestionCount === 1;
    setShowFollowUp(nextShowFollowUp);

    setLoading(false);
  };

  const getRelevantFollowUps = (question: string) => {
    return followUpQuestions[question]?.questions || [];
  };

  const handleRestart = () => {
    setMessages([]);
    setQuestionCount(0);
    setShowFollowUp(false);
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-[#fafbfc] font-plus-jakarta text-slate-700 antialiased">

      {/* SIDEBAR */}
      <aside className={`transition-all duration-300 ease-in-out bg-[#fafbfc] flex flex-col z-20 flex-shrink-0 ${sidebarOpen ? 'w-[250px]' : 'w-0 overflow-hidden'}`}>

        {/* Sidebar Header: Logo (No border-b for connected look) */}
        <div className="h-16 pl-[26px] pr-4 flex items-center justify-start gap-2.5 flex-shrink-0 bg-[#fafbfc]">
          <img src={NeoLogo} alt="Neo Logo" className="h-8 object-contain" />
          <div className="flex items-baseline select-none">
            <span className="text-[15px] font-bold text-slate-800">Ask Neo</span>
            <span className="text-[10.5px] font-medium text-slate-400 italic ml-1.5">by DataChannel</span>
          </div>
        </div>

        {/* Navigation Tabs (Hoverable only, non-clickable) */}
        <div className="px-3 py-3.5 space-y-1 flex-shrink-0">
          <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold bg-[#e8eefc] text-neo-blue shadow-sm cursor-default">
            <MessageSquare size={16} className="text-neo-blue" />
            Chat
          </div>

          <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
            <FolderKanban size={16} className="text-slate-800" />
            Collections
          </div>

          <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
            <Database size={16} className="text-slate-800" />
            Sources
          </div>
        </div>

        <div className="px-3 flex-shrink-0">
          <div className="h-[1px] bg-slate-200 my-1"></div>
        </div>

        {/* Start New Thread Button (Custom OKLCH blue) */}
        <div className="px-3 py-2 flex-shrink-0">
          <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-neo-blue hover:bg-neo-blue-hover text-white text-[12.5px] font-semibold shadow-sm transition-all cursor-default">
            <Plus size={15} />
            Start New Thread
          </button>
        </div>

        {/* Threads Section */}
        <div className="flex-1 px-4 py-3 flex flex-col overflow-hidden">
          <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Threads
          </p>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12.5px] font-semibold bg-[#e8eefc] text-neo-blue cursor-default">
              <MessageSquare size={13.5} className="text-neo-blue" />
              <span className="truncate">Sales Data</span>
            </div>

            <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
              <MessageSquare size={13.5} className="text-slate-800" />
              <span className="truncate">Marketing data</span>
            </div>
          </div>
        </div>

        {/* Bottom Profile and Settings */}
        <div className="mt-auto p-4 bg-[#fafbfc] flex-shrink-0">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200/30 text-[13.5px] font-semibold text-slate-800 transition cursor-default">
            <Settings size={16.5} className="text-slate-800" />
            Settings
          </button>

          <div className="mt-4 flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-[#d946ef] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              D
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate text-slate-700">
                DC_frontend...
              </p>

              <p className="text-xs text-[#94a3b8] truncate">
                DC_frontendtes...
              </p>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden relative">

        {/* Rounded top-left card container for chat workspace */}
        <div className="flex-1 bg-white border-t border-l border-slate-300 rounded-tl-lg flex flex-col overflow-hidden relative">

          {/* Sidebar Toggle Button (Static/Does not do anything) */}
          <button
            className="absolute top-4 left-4 z-30 p-2 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white text-slate-600 transition shadow-sm flex items-center justify-center cursor-default"
            title="Sidebar"
          >
            <PanelLeft size={18} />
          </button>

          {/* CHAT VIEWPORT */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Messages list */}
            <div ref={chatAreaRef} className="flex-1 overflow-y-auto px-8 pt-16 pb-8 custom-scrollbar bg-white">
              <div className="max-w-4xl mx-auto w-full space-y-6">

                {messages.length === 0 ? (
                  <div className="flex flex-col justify-center py-6">
                    <div className="mb-8 text-center md:text-left">
                      <h1 className="text-[23px] font-bold text-slate-800 leading-tight">
                        Hi there !
                      </h1>
                      <h2 className="text-[14.5px] text-slate-500 mt-2">
                        Select a question to try Ask Neo
                      </h2>
                    </div>

                    {/* Question Options */}
                    <div className="rounded-2xl border border-slate-300 bg-white p-2.5 shadow-sm space-y-2">
                      {initialQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => !loading && handleQuestionClick(q)}
                          disabled={loading}
                          className="w-full flex items-center justify-between rounded-xl border border-slate-200 hover:border-neo-blue hover:bg-blue-50/5 transition px-5 py-3.5 text-left group"
                        >
                          <span className="text-[13.5px] font-medium text-slate-700 group-hover:text-slate-900">
                            {q}
                          </span>
                          <div className="h-8 w-8 flex-shrink-0 rounded-lg border border-slate-200 flex items-center justify-center text-neo-blue group-hover:bg-neo-blue group-hover:text-white group-hover:border-neo-blue transition-all">
                            <ArrowUpRight size={15} />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Float Illustration */}
                    <div className="mt-10 flex justify-center">
                      <style>
                        {`
                          @keyframes float {
                            0%, 100% {
                              transform: translateY(0px);
                            }
                            50% {
                              transform: translateY(-10px);
                            }
                          }
                          .animate-float {
                            animation: float 2.5s ease-in-out infinite;
                        }
                      `}
                      </style>
                      <img
                        src={InteractNudge}
                        alt="Interact nudge"
                        className="w-full max-w-[400px] mx-auto animate-float"
                      />
                    </div>
                  </div>
                ) : (
                  /* Conversation messages */
                  <div className="space-y-5">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "assistant" && (
                          <img
                            src={NeoIconChat}
                            alt="AI Avatar"
                            className="h-8 w-8 rounded-lg flex-shrink-0 mt-0.5 object-contain"
                          />
                        )}

                        <div
                          className={`max-w-[85%] rounded-xl px-4 py-3 border shadow-sm ${message.type === "user"
                            ? "bg-neo-blue text-white border-neo-blue"
                            : "bg-white border-slate-200 text-slate-800"
                            }`}
                        >
                          <div className="text-[13.5px] leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>

                          {message.chart && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              {message.chart}
                            </div>
                          )}
                        </div>

                        {message.type === "user" && (
                          <img
                            src={UserIcon}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-lg flex-shrink-0 mt-0.5 object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Questions */}
                {showFollowUp &&
                  questionCount < 2 &&
                  messages.length > 0 &&
                  !loading && (
                    <div className="mt-6 py-5">
                      <div className="flex items-center gap-1.5 mb-3">
                        <img
                          src={NeoIconChat}
                          alt="Neo Icon"
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-[12px] font-medium text-slate-500">
                          Suggested Questions
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {getRelevantFollowUps(
                          messages[messages.length - 2].content
                        ).map((q, i) => (
                          <button
                            key={i}
                            onClick={() => !loading && handleQuestionClick(q)}
                            className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white hover:border-neo-blue transition px-5 py-3 text-left group"
                          >
                            <span className="text-[12.5px] font-medium text-slate-700 group-hover:text-slate-900">
                              {q}
                            </span>
                            <div className="h-7 w-7 flex-shrink-0 rounded-md border border-slate-200 flex items-center justify-center text-neo-blue group-hover:bg-neo-blue group-hover:text-white group-hover:border-neo-blue transition-all">
                              <ArrowUpRight size={14} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Typing loader */}
                {loading && (
                  <div className="flex gap-4 justify-start">
                    <img
                      src={NeoIconChat}
                      alt="AI Avatar"
                      className="h-8 w-8 rounded-lg flex-shrink-0 mt-0.5 object-contain"
                    />
                    <div className="bg-white border border-slate-250 border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-1.5 text-slate-450">
                      <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}

                {/* Restart */}
                {questionCount >= 2 && !loading && (
                  <div className="flex justify-center pt-3">
                    <button
                      onClick={handleRestart}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-neo-blue hover:bg-neo-blue-hover text-white text-[12.5px] font-medium transition shadow-sm"
                    >
                      <RotateCcw size={12.5} />
                      Restart Chat
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Textbox input (Matching reference image) */}
          <div className="bg-white px-6 py-6 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-slate-300 bg-[#fafbfc] p-3.5 shadow-sm flex flex-col gap-2">
                {/* Textarea */}
                <textarea
                  disabled
                  placeholder="Ask anything about your data..."
                  className="w-full h-14 resize-none bg-transparent px-2 py-1 outline-none text-[13.5px] text-slate-800 placeholder-slate-400 cursor-not-allowed"
                />

                {/* Bottom row actions */}
                <div className="flex items-center justify-between px-1">
                  {/* Left: Actions */}
                  <div className="flex items-center gap-2">
                    <button className="h-8 w-8 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-100 transition cursor-default">
                      <Sliders size={14} className="text-slate-500" />
                    </button>
                    <button className="h-8 px-3 rounded-lg border border-slate-300 bg-white flex items-center gap-1.5 text-slate-650 text-slate-600 hover:bg-slate-100 transition cursor-default">
                      <Sparkles size={13} className="text-slate-500" />
                      <span className="text-[11px] font-semibold">Explanatory</span>
                    </button>
                  </div>

                  {/* Right: Send */}
                  <button className="h-8 w-8 rounded-lg bg-neo-blue hover:bg-neo-blue-hover text-white flex items-center justify-center shadow-sm transition cursor-default">
                    <ArrowUp size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;