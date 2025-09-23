// router.tsx
import {createBrowserRouter} from "react-router-dom";
import Builder from "../pages/builderPage/BuilderPage.tsx";
import HeroDetails from "../pages/heroDetails/HeroDetails.tsx";
import Home from "../pages/home/Home.tsx";
import MapDetails from "../pages/mapDetails/MapDetails.tsx";
import DataList from "../pages/dataList/DataList.tsx";
import {getAllHeroes, getHero} from "../api/Hero.api.ts";
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
import {getMapById} from "../api/Map.api.ts";
import {getAllPlayersStats, getPlayerStats} from "../api/Player.api.ts";
import {getTeamById} from "../api/Compo.api.ts";
import ResetPasswordPage from "../pages/resetPasswordPage/ResetPasswordPage.tsx";
import ErrorPage from "../pages/layout/errorGlobalPage/ErrorPage.tsx";


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
                loader: ({params: {id}}) => getHero(id!),
                errorElement: <ErrorPage />
            },
            {
                path: "/best-players-by-hero/:id",
                element: <BestPlayersPage/>,
                loader: ({params: {id}}) => getHeroLeaderboard(id!, 0, 25),
                errorElement: <ErrorPage />
            },
            {
                path: "/list",
                element: <DataList />,
            },
            {
                path: "/maps/:id",
                element: <MapDetails />,
                loader: ({params: {id}}) => getMapById(id!),
                errorElement: <ErrorPage />
            },
            {
                path: "/team/:teamId",
                element: <TeamCompositionCheckout />,
                loader: ({params: {teamId}}) => getTeamById(teamId!),
                errorElement: <ErrorPage />
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
                loader: () => getAllPlayersStats()
            },
            {
                path: "/user/teams",
                element: <UserTeamList/>,
            },
            {
                path: "/user/player/:id",
                element: <Player/>,
                loader: ({params: {id}}) => getPlayerStats(id!),
                errorElement: <ErrorPage />
            },
            {
                path: "/reset-password",
                element: <ResetPasswordPage/>
            },
            {
                path: "/*",
                element: <ErrorPage/>
            },
            {
                path: "/error",
                element: <ErrorPage/>
            }
        ]
    }
]);

export default Router;
