import React, { useRef, useState } from "react";
import AITalkingCircle from "../components/immersive/AITalkingCircle";
import { sendToTalkAPI } from "../services/talkService";

type Status = "idle" | "listening" | "thinking" | "speaking";

// optional: local declaration if TS complains
interface MySpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

const ImmersiveMode: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus("listening");

    recognition.onresult = async (event: MySpeechRecognitionEvent) => {
      const userText = event.results[0][0].transcript;
      setTranscript(userText);
      setStatus("thinking");

      const audioBlob = await sendToTalkAPI(userText);
      if (!audioBlob) {
        setStatus("idle");
        return;
      }

      setStatus("speaking");
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setStatus("idle");
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setStatus("idle");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🧠 MyCogniAI – Immersive Mode</h1>
      <AITalkingCircle status={status} />
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full"
        onClick={startListening}
      >
        {status === "idle" ? "Start Talking" : status}
      </button>

      <div className="mt-6">
        <p><strong>You:</strong> {transcript}</p>
      </div>
    </div>
  );
};

export default ImmersiveMode;
