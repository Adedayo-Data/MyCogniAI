# MyCogniAI ✨

MyCogniAI is a groundbreaking AI-powered tutor that delivers a fully immersive, voice-enabled learning experience. Designed for curious minds, it simulates the experience of chatting with a real teacher by combining the power of LLMs with realistic text-to-speech and avatar-based video playback.

![MyCogniAI Screenshot](screenshot.png) <!-- Optional: Add if available -->

---

## 🌟 Features

* ✍️ **Chat with AI Tutor**: Ask any question and receive thoughtful answers generated in real-time.
* 🔊 **Voice Responses**: Hear responses read aloud with human-like intonation.
* 🤺 **Animated Avatar**: Visual feedback from a AI tutor that makes the experience engaging.
* ⚡ **Fast & Lightweight**: Built with React, Vite, and Spring Boot for a snappy experience.


---

## 🚀 Tech Stack

**Frontend**

* React + TypeScript
* Tailwind CSS
* Framer Motion
* ShadCN UI

**Backend**

* Spring Boot (Java)
* Gemini AI API for intelligent responses
* ElevenLabs TTS API for audio generation

---

## 🎯 How It Works

1. User submits a question via the chat interface
2. The message is sent to a Spring Boot backend
3. Gemini generates an intelligent textual response
4. Response is sent to ElevenLabs, which returns an audio file
5. Frontend plays the avatar loop video + voice audio together
6. The full AI response is also shown in the chat bubble

---

## 🔧 Local Setup (Optional)

```bash
# Clone this repository
$ git clone https://github.com/Adedayo-Data/MyCogniAI.git

# Navigate to frontend
$ cd mycogniai-ui
$ npm install
$ npm run dev

# Backend (Java, Spring Boot)
$ cd ../mycogniai-backend
$ ./mvnw spring-boot:run
```

You must provide your own API keys for Gemini and ElevenLabs in your backend.

---

## 🎥 Demo Video

\[Insert YouTube or Drive Link Here]

---

## 📖 Devpost Description

You can find our written explanation and vision for the future of immersive education on our [Devpost page](https://devpost.com/your-project-link).

---

## 🚀 Team MyCogniAI

Built with love, urgency, and ambition during United Hacks 2025.

* 🧠 Dayo (Fullstack Dev)

---

## ✨ Vision

This is just the beginning. Our roadmap includes:

* Webcam integration (so the tutor can see you!)
* Emotion-aware tutoring
* Curriculum personalization
* Progress tracking & gamification
* Modification of AI tutor
* Dual tutor mode enabling the combine effort of Human and AI tutoring and many more

> MyCogniAI is not just an app — it's the future of personal learning.
