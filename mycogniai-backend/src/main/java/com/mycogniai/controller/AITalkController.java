package com.mycogniai.controller;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/talk")
public class AITalkController {


    @Value("${TTS_API_KEY}")
    private String elevenLabsKey;

    @Value("${GEMINI_API_KEY}")
    private String geminiKey;

    @PostMapping
    public ResponseEntity<byte[]> talk(@RequestBody AIRequest aiRequest) {
        try {
            String message = aiRequest.getMessage();

            String geminiBody = """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """.formatted(message.replace("\"", "\\\""));

            HttpResponse<JsonNode> geminiRes = Unirest
                    .post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiKey)
                    .header("Content-Type", "application/json")
                    .body(geminiBody)
                    .asJson();

            if (geminiRes.getStatus() != 200) {
                return ResponseEntity.status(500).body(("Gemini Error: " + geminiRes.getBody()).getBytes());
            }

            String reply = geminiRes.getBody()
                    .getObject()
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            // ✅ Print Gemini reply to debug
            System.out.println("Gemini reply: " + reply);

            // Check if reply is empty or null before sending to ElevenLabs
            if (reply == null || reply.isBlank()) {
                return ResponseEntity.status(400).body("Gemini returned an empty response.".getBytes());
            }
            System.out.println("Entering Eleven labs with message!");
            // Prepare request for ElevenLabs
            // Clean Gemini reply for ElevenLabs
            // ✅ Clean and trim reply
            // 1. Clean the Gemini reply for ElevenLabs
            String cleanedReply = reply
                    .replaceAll("[\\n\\r]+", " ") // Replace newlines with a space
                    .replaceAll("\"", "'")        // Replace double quotes with single quotes to avoid breaking JSON
                    .replaceAll("[“”]", "'")      // Replace smart quotes
                    .replaceAll("[‘’]", "'")      // Replace single smart quotes
                    .replaceAll("[*]", "")        // Remove markdown asterisks
                    .replaceAll("[\\u2014]", "-") // Replace em-dash with regular dash
                    .trim();

            // 2. Enforce a max length to avoid 422 errors from ElevenLabs
            if (cleanedReply.length() > 800) {
                cleanedReply = cleanedReply.substring(0, 800);
            }

            // 3. Log it for debugging
            System.out.println("Sanitized Gemini reply: " + cleanedReply);

            // 4. Format ElevenLabs JSON payload safely
            String elevenBody = """
            {
              "text": "%s",
              "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.8
              }
            }
            """.formatted(cleanedReply);


            System.out.println("Eleven labs key: " + elevenLabsKey);
            System.out.println("Eleven body: " + elevenBody);
            HttpResponse<byte[]> ttsRes = Unirest
                    .post("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?output_format=mp3_44100_128")
                    .header("xi-api-key", elevenLabsKey)
                    .header("Content-Type", "application/json")
                    .body(elevenBody)
                    .asBytes();

            if (ttsRes.getStatus() != 200) {
                return ResponseEntity.status(500).body(("TTS Error: " + ttsRes.getStatus()).getBytes());
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("audio/mpeg"))
                    .body(ttsRes.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(("Server error: " + e.getMessage()).getBytes());
        }
    }

}