import './ShinyText.css';
import Typography from "@mui/material/Typography";

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
             style={{ animationDuration,
                 display: "flex",
                 flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
        }}>

            <Typography variant={"h5"} color={"action"}>Tired of unbalanced comps?</Typography>
            <p style={{lineHeight: "1.4"}}>
                With Rivals Builder, you can create, analyze, and optimize your teams in just a few clicks.<br/>
                <br/>
                🔥 Smart Team Builder: synergies, counter-picks, and role balance.<br/>
                📊 Detailed Stats: winrate per hero, against each character, and with your teammates.<br/>
                🎯 Goal: help you improve and dominate your matches.<br/>
                <br/>
                Test your ideas, find your ideal comp, and become an unbeatable strategist!<br/>
            </p>
        </div>
    );
};

export default ShinyText;
