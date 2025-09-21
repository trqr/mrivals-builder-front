import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {askAIStream} from "../../api/AI.api.ts";
import SpotlightCard from "../common/cards/spotlightCard/SpotlightCard.tsx";

type StreamingAIProps = {
    prompt: string;
};

const StreamingAiResponse = ({prompt}: StreamingAIProps) => {
    const [response, setResponse] = useState("");
    const [lastLength, setLastLength] = useState(0);

        useEffect(() => {
            setResponse("");
            setLastLength(0);

            askAIStream(prompt, (fullText) => {
                const newChunk = fullText.substring(lastLength);
                setLastLength(fullText.length);
                setResponse((prev) => prev + newChunk);
                console.log(response);
            });
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
