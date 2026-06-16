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
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import ReactMarkdown from "react-markdown";

import followUpQuestionsData from "./data/followUpQuestions.json";

import NeoIcon from "./assets/neo-icon.png";
import NeoIconChat from "./assets/neo_icon_chat.png";
import InteractNudge from "./assets/interact_nudge.png";
import UserIcon from "./assets/USER.png";

import SafariFrameSVG from "./assets/Safari SVG Frame.svg";

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
  const [showInitialQuestions, setShowInitialQuestions] = useState(true);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [svgLoaded, setSvgLoaded] = useState(false);

  const svgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.complete) {
      setSvgLoaded(true);
    }
  }, []);

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
  }, [messages, showFollowUp]);

  const initialQuestions = [
    "How does the performance of different advertising platforms compare?",
    "How many orders were shipped to California in 2024?",
  ];

  const followUpQuestions: FollowUpQuestions = followUpQuestionsData;

  const handleQuestionClick = async (question: string) => {
    setLoading(true);
    setShowInitialQuestions(false);

    if (questionCount === 0) {
      setMessages([]);
    }

    const userMessage: Message = {
      type: "user",
      content: question,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response: Message = {
      type: "assistant",
      content: (
        <ReactMarkdown>
          {followUpQuestions[question]?.responses}
        </ReactMarkdown>
      ) || "Based on our analysis, we've seen significant growth.",
      chart: (
        <ReactECharts
          option={followUpQuestions[question]?.chartData}
          opts={{ renderer: "svg" }}
          style={{ height: "400px", width: "100%" }}
        />
      ),
      id: (Date.now() + 1).toString(),
    };

    setMessages((prev) => [...prev, response]);

    setQuestionCount((prev) => prev + 1);

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
    <div className="w-screen h-screen overflow-hidden bg-white flex flex-col items-center justify-center p-0 md:p-2 lg:p-4 relative bg-[#FAFCFF]">

      {/* Loading Overlay */}
      {!svgLoaded && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-[#216FED]/20 border-t-[#216FED] rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-500 tracking-wide">Loading Ask Neo...</span>
          </div>
        </div>
      )}

      {/* Mockup Container */}
      <div className={`bg-[#FAFCFF] w-full h-full md:relative md:aspect-[1455/939] md:w-[min(98vw,calc(98vh*1455/939))] md:h-[min(98vh,calc(98vw*939/1455))] transition-opacity duration-300 ${svgLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full h-full">
          {/* Mockup SVG */}
          <img
            ref={svgRef}
            src={SafariFrameSVG}
            className="absolute opacity-0 pointer-events-none md:relative md:opacity-100 w-full h-full object-fill select-none"
            alt="Safari Browser Mockup"
            onLoad={() => setSvgLoaded(true)}
          />
          {/* Embedded App viewport */}
          <div className="w-full h-full md:absolute md:overflow-hidden md:rounded-[4px] md:top-[7.74%] md:left-[1.16%] md:w-[97.63%] md:h-[90.06%]">
            <div className="overflow-hidden bg-white flex font-plus-jakarta text-[#1f2937] box-border w-full h-full">

              {/* SIDEBAR */}
              <div className="hidden md:flex w-[260px] bg-[#f4f6fa] border-r border-[#e5e7eb] flex-col">

                {/* Logo */}
                <div className="h-[72px] px-5 flex items-center justify-between border-b border-[#dde3ec]">
                  <div className="flex items-center gap-2">
                    <img src={NeoIcon} alt="Neo" className="h-12" />
                  </div>

                  <button className="p-1 rounded-md hover:bg-[#f3f4f6] transition">
                    <PanelLeft size={16} className="text-gray-500" />
                  </button>
                </div>

                {/* Nav */}
                <div className="px-3 py-4 space-y-1">
                  {[
                    {
                      label: "Chat",
                      icon: MessageSquare,
                      active: true,
                    },
                    {
                      label: "Collections",
                      icon: FolderKanban,
                    },
                    {
                      label: "Sources",
                      icon: Database,
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={index}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
        ${item.active
                            ? "bg-[#e8f0ff] text-[#216FED] border border-[#cfe0ff] shadow-sm"
                            : "hover:bg-[#e9edf5] text-[#4b5563]"
                          }`}
                      >
                        <Icon size={17} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Threads */}
                <div className="px-4 pt-2 pb-3 border-t border-[#dde3ec]">
                  <p className="text-xs font-semibold text-[#9ca3af] uppercase mb-3">
                    Threads
                  </p>

                  <div className="relative mb-4">
                    <input
                      placeholder="Search..."
                      className="w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 text-sm outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-[#9ca3af] mb-2">Today</p>

                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e8f0ff] border border-[#cfe0ff] text-[#216FED] text-sm font-medium shadow-sm">
                      <MessageSquare size={15} className="text-[#216FED]" />
                      Sales Data
                    </button>

                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#e9edf5] text-sm text-[#4b5563] transition">
                      <MessageSquare size={15} />
                      Inflation info
                    </button>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-auto border-t border-[#eef0f4] p-4">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9edf5] text-sm text-[#4b5563] transition">            <Settings size={16} />
                    Settings
                  </button>

                  <div className="mt-4 flex items-center gap-3 px-2">
                    <div className="h-9 w-9 rounded-full bg-[#d946ef] flex items-center justify-center text-white text-sm font-semibold">
                      D
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">
                        DC_frontend...
                      </p>

                      <p className="text-xs text-[#9ca3af] truncate">
                        DC_frontendtes...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAIN AREA */}
              <div className="flex-1 flex flex-col relative">

                {/* CHAT AREA */}
                <div
                  ref={chatAreaRef}
                  className={`flex-1 custom-scrollbar ${showInitialQuestions ? "flex flex-col justify-center overflow-hidden" : "overflow-y-auto"}`}
                >
                  <div className={`max-w-3xl w-full mx-auto px-8 ${showInitialQuestions ? "flex-1 flex flex-col justify-center" : "py-20"}`}>

                    {/* EMPTY STATE */}
                    {showInitialQuestions && (
                      <div className="max-w-2xl mx-auto w-full flex flex-col justify-center">

                        <div className="mb-10">
                          <h1 className="text-[24px] leading-[28px] font-light tracking-tight">
                            Hi there !
                          </h1>

                          <h2 className="text-[18px] leading-[28px] font-light text-[#3f3f46] mt-2">
                            Select a question to try Ask Neo
                          </h2>
                        </div>

                        {/* QUESTIONS */}
                        <div className="rounded-2xl border border-[#eceef3] bg-white p-3 shadow-sm space-y-3">
                          {initialQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => !loading && handleQuestionClick(q)}
                              disabled={loading}
                              className="w-full flex items-center justify-between rounded-xl border border-[#eef0f4] hover:border-[#216FED] hover:shadow-sm transition px-5 py-4 text-left group"
                            >
                              <span className="text-[18px] leading-[28px] text-[#3f3f46]">
                                {q}
                              </span>

                              <div className="h-10 w-10 flex-shrink-0 rounded-xl border border-[#216FED] flex items-center justify-center text-[#216FED] group-hover:bg-[#216FED] group-hover:text-white transition">
                                <ArrowUpRight size={18} />
                              </div>
                            </button>
                          ))}
                        </div>
                        {/* Animated Neo Illustration */}
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
                      animation: float 2s ease-in-out infinite;
                    }
                  `}
                          </style>

                          <img
                            src={InteractNudge}
                            alt="Interact nudge"
                            className="w-full max-w-md mx-auto animate-float"
                          />
                        </div>
                      </div>
                    )}

                    {/* MESSAGES */}
                    {messages.length > 0 && (
                      <div className="space-y-8 mt-10">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-4 ${message.type === "user"
                              ? "justify-end"
                              : "justify-start"
                              }`}
                          >
                            {message.type === "assistant" && (
                              <img
                                src={NeoIconChat}
                                alt="AI"
                                className="h-9 w-9 rounded-lg flex-shrink-0 mt-1"
                              />
                            )}

                            <div
                              className={`max-w-3xl rounded-2xl px-5 py-4 border shadow-sm ${message.type === "user"
                                ? "bg-[#216FED] text-white border-[#216FED]"
                                : "bg-white border-[#eceef3]"
                                }`}
                            >
                              <div className="text-[15px] leading-7">
                                {message.content}
                              </div>

                              {message.chart && (
                                <div className="mt-6 pt-6 border-t border-[#eef0f4]">
                                  {message.chart}
                                </div>
                              )}
                            </div>

                            {message.type === "user" && (
                              <img
                                src={UserIcon}
                                alt="User"
                                className="h-9 w-9 rounded-lg flex-shrink-0 mt-1"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* FOLLOW UPS */}
                    {showFollowUp &&
                      questionCount < 2 &&
                      messages.length > 0 &&
                      !loading && (
                        <div className="mt-10">
                          <div className="flex items-center gap-2 mb-4">
                            <img
                              src={NeoIconChat}
                              alt="Neo"
                              className="h-7"
                            />

                            <span className="text-sm text-[#6b7280] font-medium">
                              Suggested Questions
                            </span>
                          </div>

                          <div className="space-y-3">
                            {getRelevantFollowUps(
                              messages[messages.length - 2].content
                            ).map((q, i) => (
                              <button
                                key={i}
                                onClick={() =>
                                  !loading && handleQuestionClick(q)
                                }
                                className="w-full flex items-center justify-between rounded-xl border border-[#eceef3] bg-white hover:border-[#216FED] hover:shadow-sm transition px-5 py-4 text-left group"
                              >
                                <span className="text-[#3f3f46]">
                                  {q}
                                </span>

                                <div className="h-10 w-10 flex-shrink-0 rounded-xl border border-[#216FED] flex items-center justify-center text-[#216FED] group-hover:bg-[#216FED] group-hover:text-white transition">
                                  <ArrowUpRight size={18} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                  </div>
                </div>
                {/* Restart */}
                {questionCount >= 2 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={handleRestart}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#216FED] text-white hover:bg-[#1959c7] transition"
                    >
                      <RotateCcw size={16} />
                      Restart Chat
                    </button>
                  </div>
                )}

                {/* INPUT AREA */}
                <div className=" px-8 py-5">
                  <div className="max-w-3xl mx-auto">


                    {/* TEXTBOX */}
                    <div className="hidden md:block relative rounded-2xl border border-[#e5e7eb] bg-[#fafbfc] shadow-sm">
                      <textarea
                        disabled
                        placeholder="Ask anything about your data..."
                        className="w-full h-[92px] resize-none bg-transparent px-5 py-4 pr-20 outline-none text-[15px] text-[#6b7280]"
                      />

                      {/* Left icon */}
                      <button className="absolute left-4 bottom-4 h-9 w-9 rounded-xl border border-[#dfe3ea] bg-white flex items-center justify-center text-[#94a3b8]">
                        <Sliders size={18} />
                      </button>

                      {/* Send */}
                      <button className="absolute right-4 bottom-4 h-10 w-10 rounded-xl bg-[#216FED] text-white flex items-center justify-center shadow-sm">
                        <ArrowUp size={18} />
                      </button>
                    </div>
                  </div>
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