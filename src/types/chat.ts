import React from "react";

export interface Message {
  type: "user" | "assistant";
  content: any;
  chart?: React.ReactNode;
  id: string;
}

export interface FollowUpQuestions {
  [key: string]: {
    responses: string;
    chartData: any;
    questions: string[];
  };
}
