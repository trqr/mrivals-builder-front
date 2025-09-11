// router.tsx
import {createBrowserRouter} from "react-router-dom";
import Builder from "../pages/builderPage/BuilderPage.tsx";
import HeroDetails from "../pages/heroDetails/HeroDetails.tsx";
import Home from "../pages/home/Home.tsx";
import MapDetails from "../pages/mapDetails/MapDetails.tsx";
import DataList from "../pages/dataList/DataList.tsx";
import {getAllHeroes, getHeroes} from "../api/Hero.api.ts";
import TeamCompositionCheckout from "../pages/teamCompositionCheckout/TeamCompositionCheckout.tsx";
import Layout from "../pages/layout/Layout.tsx";
import AdministrationPage from "../pages/administrationPage/AdministrationPage.tsx";
import {getAllUsers} from "../api/User.api.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import UserSettings from "../pages/userSettings/UserSettings.tsx";
import UserTeamList from "../pages/userTeamList/UserTeamList.tsx";
import BestPlayersPage from "../pages/bestPlayersPage/BestPlayersPage.tsx";
import {getHeroLeaderboard} from "../api/Leaderboard.api.ts";
import Player from "../pages/player/Player.tsx";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/builder",
                element: <Builder />,
                loader: () => getAllHeroes()
            },
            {
                path: "/heroDetails/:id",
                element: <HeroDetails />,
                loader: ({params: {id}}) => getHeroes(id!)
            },
            {
                path: "/best-players-by-hero/:id",
                element: <BestPlayersPage/>,
                loader: ({params: {id}}) => getHeroLeaderboard(id!, 0, 25)
            },
            {
                path: "/list",
                element: <DataList />,
            },
            {
                path: "/maps/:id",
                element: <MapDetails />,
            },
            {
                path: "/team",
                element: <TeamCompositionCheckout />,
            },
            {
                path: "/admin",
                element:
                    <ProtectedRoute>
                        <AdministrationPage/>
                    </ProtectedRoute>,
                loader: ()  => getAllUsers()
            },
            {
                path: "/user/settings",
                element: <UserSettings/>,
            },
            {
                path: "/user/teams",
                element: <UserTeamList/>,
            },
            {
                path: "/user/player/:account",
                element: <Player/>,
            }
        ]
    }
]);

export default Router;
