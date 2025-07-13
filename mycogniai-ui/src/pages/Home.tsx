import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4">
          Welcome to MyCogniAI
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Welcome to the future of learning. With MyCogniAI, you can now talk to a real-time AI tutor that not only speaks, but also appears as a human-like avatar. The tutor listens, responds, and will soon even be able to see and understand you — creating a fully immersive, personal classroom experience.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg rounded-xl shadow-lg flex items-center gap-2"
            onClick={() => navigate("/tutor-chat")}
            >
            <Sparkles size={20} /> Start Immersive Chat
        </Button>

        </motion.div>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {[
          {
            title: "Interactive AI Tutor",
            desc: "Talk to a tutor that listens, thinks, and explains concepts in real time like a real teacher.",
          },
          {
            title: "Immersive Chat Mode",
            desc: "Experience a unique blend of video-based avatars with real voice responses from cutting-edge TTS.",
          },
          {
            title: "No Signup Required",
            desc: "Jump right into learning. No registration needed. One click and you're talking to AI.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-indigo-100"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </motion.div>

      <footer className="mt-20 text-sm text-gray-500 text-center">
        Built with ❤️ for curious minds by Team MyCogniAI
      </footer>
    </div>
  );
}
