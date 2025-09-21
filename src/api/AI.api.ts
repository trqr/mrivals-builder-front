// AI.api.ts
export const askAIStream = async (
    prompt: string,
    onChunk: (chunk: string) => void
) => {
    const res = await fetch("http://localhost:8080/ai/marvel-compo", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({prompt}),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
        const {value, done: readerDone} = await reader.read();
        done = readerDone;
        if (value) {
            const chunk = decoder.decode(value);

            const lines = chunk.split("\n").filter((l) => l.trim() !== "");
            lines.forEach((line) => {
                try {

                    const cleaned = line.replace(/^data:/, "").trim();
                    if (!cleaned) return;

                    const parsed = JSON.parse(cleaned);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                        onChunk(content);
                    }
                } catch (e) {
                    console.error("Parsing chunk failed:", e);
                }
            });
        }
    }
};
