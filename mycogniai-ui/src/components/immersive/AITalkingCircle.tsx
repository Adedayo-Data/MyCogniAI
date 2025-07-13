import React from "react";

type AITalkingCircleProps = {
  status: "idle" | "listening" | "thinking" | "speaking";
};

const AITalkingCircle: React.FC<AITalkingCircleProps> = ({ status }) => {
  const isSpeaking = status === "speaking";

  return (
    <div className="w-32 h-32 rounded-full border-4 border-blue-400 flex items-center justify-center relative">
      {isSpeaking && (
        <div className="absolute w-full h-full animate-pulse border-4 border-blue-600 rounded-full opacity-60"></div>
      )}
      <span className="text-white">{status}</span>
    </div>
  );
};

export default AITalkingCircle;
