import {Api} from "./axios.config"


export const getBestWinRateByRole = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/bestWinRateByRole", heroesIds)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}

export const getTeamCounter = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/teamCounter", heroesIds)
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
}

export const saveCompo = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/save", heroesIds)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}