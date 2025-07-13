// src/pages/TutorChat.tsx
import { useState, useEffect, useRef } from "react";

const TutorChat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Dayo 👋🏽 Great to see you. I'm ready once you are!" },
  ]);
  const [avatarState, setAvatarState] = useState<"intro" | "idle" | "speaking">("intro");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8080/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      const geminiReply = res.headers.get("X-Gemini-Text") || "Hmm... I didn't catch that.";

      setAvatarState("speaking");
      setIsSpeaking(true);

      // Only show reply after audio is done (for realism)
      // 🟢 Immediately show the AI reply in chat
      setMessages((prev) => [...prev, { role: "ai", text: geminiReply }]);

      audio.play();
      audio.onended = () => {
        setAvatarState("idle");
        setIsSpeaking(false);
      };

      audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong with the tutor's response." },
      ]);
      setAvatarState("idle");
      setIsSpeaking(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="py-4 px-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">MyCogniAI - Tutor</h1>
      </header>

      <main className="flex-1 grid lg:grid-cols-3">
        {/* LEFT: Avatar */}
        <div className="col-span-1 bg-gray-100 p-6 flex items-center justify-center border-r border-gray-300">
          <div className="w-full max-w-[400px] aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden relative">
            {avatarState === "intro" && (
              <video
                className="w-full h-full object-cover"
                src="/intro-avatar.mp4"
                autoPlay
                onEnded={() => setAvatarState("idle")}
              />
            )}

            {isSpeaking ? (
              <video
                className="w-full h-full object-cover"
                src="/talking-loop.mp4"
                autoPlay
                muted
                loop
              />
            ) : (
              avatarState === "idle" && (
                <video
                  className="w-full h-full object-cover"
                  src="/idle-loop.mp4"
                  autoPlay
                  muted
                  loop
                />
              )
            )}
            <div className="absolute bottom-2 right-2 text-xs text-white bg-indigo-600 px-2 py-1 rounded">
              AI Tutor
            </div>
          </div>
        </div>

        {/* RIGHT: Chat */}
        <div className="col-span-2 flex flex-col">
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-100 text-indigo-900"
                    : "mr-auto bg-white border text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="text-sm text-gray-500 animate-pulse ml-4">
                AI is thinking...
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border-t px-4 py-3 flex items-center gap-3 sticky bottom-0 z-10"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your tutor a question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TutorChat;
