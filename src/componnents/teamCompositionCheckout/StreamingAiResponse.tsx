import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {askAI} from "../../api/AI.api.ts";
import SpotlightCard from "../common/cards/spotlightCard/SpotlightCard.tsx";

type StreamingAIProps = {
    prompt: string;
};

const StreamingAiResponse = ({prompt}: StreamingAIProps) => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (!prompt) return;

        setResponse("...");

        const fetchAI = async () => {
            try {
                const aiResponse = await askAI(prompt);
                setResponse(aiResponse);
                console.log(aiResponse);
            } catch (err) {
                console.error("Error fetching AI:", err);
                setResponse("Error fetching AI response.");
            }
        };

        fetchAI();
    }, [prompt]);

    return (
        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Typography variant={"h6"} color={"primary"} margin={"20px"} textAlign={"center"}>Advantages and weaknesses by artificial inteligence</Typography>
                <Typography variant="subtitle2" sx={{whiteSpace: "pre-wrap"}}>
                    {response}
                </Typography>
        </SpotlightCard>
    );
};

export default StreamingAiResponse;
