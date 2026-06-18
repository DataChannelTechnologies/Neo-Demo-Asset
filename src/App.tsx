import React, { useState, useRef, useEffect } from "react";
import { PanelLeft } from "lucide-react";
import ReactECharts from "echarts-for-react";
import ReactMarkdown from "react-markdown";

import followUpQuestionsData from "./data/followUpQuestions.json";
import { Message, FollowUpQuestions } from "./types/chat";
import { Sidebar } from "./components/Sidebar";
import { ChatArea } from "./components/ChatArea";
import { ChatInput } from "./components/ChatInput";

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
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden relative">
        {/* Rounded top-left card container for chat workspace */}
        <div className="flex-1 bg-white md:border-t md:border-l md:border-slate-300 md:rounded-tl-lg flex flex-col overflow-hidden relative">
          {/* Sidebar Toggle Button (Only visible on Desktop, functional) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 z-30 p-2 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white text-slate-600 transition shadow-sm items-center justify-center hidden md:flex cursor-pointer"
            title="Toggle Sidebar"
          >
            <PanelLeft size={18} />
          </button>

          {/* CHAT VIEWPORT */}
          <ChatArea
            messages={messages}
            loading={loading}
            showFollowUp={showFollowUp}
            questionCount={questionCount}
            handleQuestionClick={handleQuestionClick}
            handleRestart={handleRestart}
            getRelevantFollowUps={getRelevantFollowUps}
            chatAreaRef={chatAreaRef}
          />

          {/* Textbox input */}
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default App;