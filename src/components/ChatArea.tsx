import React, { useState } from "react";
import { ArrowUpRight, RotateCcw, Pin, Check, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { Message } from "../types/chat";
import NeoIconChat from "../assets/neo_icon_chat.png";
import InteractNudge from "../assets/interact_nudge.png";
import UserIcon from "../assets/USER.png";

interface ChatAreaProps {
  messages: Message[];
  loading: boolean;
  showFollowUp: boolean;
  questionCount: number;
  handleQuestionClick: (question: string) => void;
  handleRestart: () => void;
  getRelevantFollowUps: (question: string) => string[];
  chatAreaRef: React.RefObject<HTMLDivElement>;
  onPinToStoryboard: () => void;
}

const initialQuestions = [
  "How does the performance of different advertising platforms compare?",
  "How many orders were shipped to California in 2024?",
];

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  loading,
  showFollowUp,
  questionCount,
  handleQuestionClick,
  handleRestart,
  getRelevantFollowUps,
  chatAreaRef,
  onPinToStoryboard,
}) => {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hasPinnedOnce, setHasPinnedOnce] = useState(false);

  const handlePinClick = (messageId: string) => {
    setHasPinnedOnce(true);
    setPinnedId(messageId);
    setTimeout(() => {
      onPinToStoryboard();
      setPinnedId(null);
    }, 700);
  };

  const lastAssistantId = [...messages].reverse().find((m) => m.type === "assistant")?.id;

  return (
    <div ref={chatAreaRef} className="flex-1 overflow-y-auto px-8 pt-16 pb-8 custom-scrollbar bg-white">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center py-6">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-[23px] font-bold text-slate-800 leading-tight">
                Hi there!
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
                  className={`max-w-[85%] rounded-xl px-4 py-3 border shadow-sm ${
                    message.type === "user"
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

                  {message.type === "assistant" && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-400">
                        <button className="hover:text-slate-600 transition cursor-default">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="hover:text-slate-600 transition cursor-default">
                          <ThumbsDown size={14} />
                        </button>
                        <button className="hover:text-slate-600 transition cursor-default">
                          <RotateCcw size={14} />
                        </button>
                        <button className="hover:text-slate-600 transition cursor-default">
                          <Copy size={14} />
                        </button>
                      </div>

                      <div className="relative inline-block">
                        {!hasPinnedOnce && message.id === lastAssistantId && (
                          <>
                            <span className="absolute inset-0 rounded-md bg-neo-blue/40 animate-ping pointer-events-none" />
                            <div className="absolute -top-9 right-0 whitespace-nowrap animate-bounce pointer-events-none">
                              <span className="relative bg-neo-blue text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                                Try pinning this!
                                <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 h-2 w-2 rotate-45 bg-neo-blue" />
                              </span>
                            </div>
                          </>
                        )}

                        <button
                          onClick={() => handlePinClick(message.id)}
                          disabled={pinnedId !== null}
                          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[11px] font-semibold transition ${
                            pinnedId === message.id
                              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                              : "border-slate-200 text-slate-600 hover:border-neo-blue hover:text-neo-blue"
                          }`}
                        >
                          {pinnedId === message.id ? (
                            <>
                              <Check size={12} />
                              Pinned
                            </>
                          ) : (
                            <>
                              <Pin size={12} />
                              Pin to storyboard
                            </>
                          )}
                        </button>
                      </div>
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
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-1.5 text-slate-400">
              <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
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
  );
};
