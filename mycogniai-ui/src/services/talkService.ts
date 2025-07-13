export async function sendToTalkAPI(message: string): Promise<Blob | null> {
  try {
    const res = await fetch("http://localhost:8080/api/talk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("API call failed");

    const blob = await res.blob(); // audio/mpeg response
    return blob;
  } catch (err) {
    console.error("AI talk error:", err);
    alert("AI talk error");
    return null;
  }
}
