// AI.api.ts
import {api} from "./config/Axios.config.ts";

export const askAI = async (prompt: string): Promise<string> => {
    try {
        const res = await api.post(
            "/ai/marvel-compo",
            {prompt},
            {
                headers: {"Content-Type": "application/json"},
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error calling AI:", err);
        return "Error: could not get AI response.";
    }
};
