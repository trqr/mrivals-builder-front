// router.tsx
import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin.tsx";
import Builder from "../pages/Builder.tsx";
import CompoDetails from "../pages/CompoDetails.tsx";
import HeroDetails from "../pages/HeroDetails.tsx";
import Home from "../pages/Home.tsx";
import MapDetails from "../pages/MapDetails.tsx";
import DataList from "../pages/DataList.tsx";
import {getAllHeroes, getHeroes} from "../api/Hero.service.ts";
import TeamCompositionCheckout from "../pages/TeamCompositionCheckout.tsx";
import Layout from "../pages/layout/Layout.tsx";

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
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/builder",
                element: <Builder />,
                loader: () => getAllHeroes()
            },
            {
                path: "/compoDetails",
                element: <CompoDetails />,
            },
            {
                path: "/heroDetails/:id",
                element: <HeroDetails />,
                loader: ({params: {id}}) => getHeroes(id!)
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
        ]
    }
]);

export default Router;
