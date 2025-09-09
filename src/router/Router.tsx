// router.tsx
import {createBrowserRouter} from "react-router-dom";
import Builder from "../pages/Builder.tsx";
import HeroDetails from "../pages/HeroDetails.tsx";
import Home from "../pages/Home.tsx";
import MapDetails from "../pages/MapDetails.tsx";
import DataList from "../pages/DataList.tsx";
import {getAllHeroes, getHeroes} from "../api/Hero.service.ts";
import TeamCompositionCheckout from "../pages/TeamCompositionCheckout.tsx";
import Layout from "../pages/layout/Layout.tsx";
import AdministrationPage from "../pages/AdministrationPage.tsx";
import {getAllUsers} from "../api/User.api.ts";
import ProtectedRoute from "../componnents/common/ProtectedRoute.tsx";
import UserSettings from "../pages/UserSettings.tsx";
import UserTeamList from "../pages/UserTeamList.tsx";
import BestPlayersPage from "../pages/BestPlayersPage.tsx";
import {getHeroLeaderboard} from "../api/Leaderboard.api.ts";
import Player from "../pages/Player.tsx";
import {getPlayerStats} from "../api/Player.service.ts";

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
                path: "/admin/heroes",
                element:
                    <ProtectedRoute>
                        <AdministrationPage/>
                    </ProtectedRoute>,
                loader: () => getAllHeroes()
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
                loader: ({params: {account}}) => getPlayerStats(account!)
            }
        ]
    }
]);

export default Router;
