import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
             style={{ animationDuration,
                 display: "flex",
                 flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"}}>

            <h4>Build the Perfect Team on Marvel Rivals ⚡</h4>

            <p>
                Tired of unbalanced comps?<br/>
                With Rivals Builder, you can create, analyze, and optimize your teams in just a few clicks.<br/>

                🔥 Smart Team Builder: synergies, counter-picks, and role balance.<br/>
                📊 Detailed Stats: winrate per hero, against each character, and with your teammates.<br/>
                🎯 Goal: help you improve and dominate your matches.<br/>

                Test your ideas, find your ideal comp, and become an unbeatable strategist!<br/>
            </p>
        </div>
    );
};

export default ShinyText;
