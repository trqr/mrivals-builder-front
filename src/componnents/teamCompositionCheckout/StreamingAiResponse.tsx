import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {askAIStream} from "../../api/AI.api.ts";

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
        <Card sx={{minWidth: 300, margin: 2}}>
            <CardHeader title="AI Response"/>
            <CardContent>
                <Typography variant="subtitle2" sx={{whiteSpace: "pre-wrap"}}>
                    {response}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StreamingAiResponse;
