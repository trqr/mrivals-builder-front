import {useEffect, useState} from "react";
import type {HeroType} from "../@types/HeroType";

const useRecommendations = (compo: HeroType[]) => {
    const [messages, setMessages] = useState({
        archetype: "",
        mainTank: "",
        mainHeal: "",
        ban: ""
    });

    useEffect(() => {
        const newMessages = {archetype: "", mainTank: "", mainHeal: "", ban: ""};

        if (compo.length === 0) {
            newMessages.archetype = "";
        } else if (compo.filter(hero => hero.role === "Duelist").length > 2) {
            newMessages.archetype = "You have way too much Duelist ! Consider replacing one duelist by a Vanguard or a Strategist";
        } else if (compo.filter(hero => hero.role === "Vanguard").length > 3) {
            newMessages.archetype = "You have way too much Vanguard ! Consider replacing one Vanguard by a Strategist or a Duelist";
        } else if (compo.filter(hero => hero.role === "Strategist").length > 3) {
            newMessages.archetype = "You have way too much Strategist ! Consider replacing one Strategist by a Vanguard or a Duelist";
        }

        if (compo.length > 0 && compo.filter(hero => hero.isMainTank).length === 0) {
            newMessages.mainTank = "You're team lack tanking. Consider picking one main Tank.";
        }

        if (compo.length > 0 && compo.filter(hero => hero.isMainHeal).length === 0) {
            newMessages.mainHeal = "You're team lack healing. Consider picking one main Heal.";
        }

        setMessages(newMessages);
    }, [compo]);

    return messages;
};

export default useRecommendations;