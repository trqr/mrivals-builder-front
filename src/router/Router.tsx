// router.tsx
import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin.tsx";
import Builder from "../pages/Builder.tsx";
import CompoDetails from "../pages/CompoDetails.tsx";
import HeroDetails from "../pages/HeroDetails.tsx";
import Home from "../pages/Home.tsx";
import MapDetails from "../pages/MapDetails.tsx";
import DataList from "../pages/DataList.tsx";
import {getHeroes} from "../api/Hero.service.ts";

// 👉 tu peux rajouter un Layout si tu veux une structure commune
// comme dans ton premier exemple
// Ici je garde simple
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,   // page par défaut
    },
    {
        path: "/Admin",
        element: <Admin />,
    },
    {
        path: "/Builder",
        element: <Builder />,
    },
    {
        path: "/CompoDetails",
        element: <CompoDetails />,
    },
    {
        path: "/HeroDetails/:id",
        element: <HeroDetails />,
        loader: ({params: {id}}) => getHeroes(id!)
    },
    {
        path: "/List",
        element: <DataList />,
    },
    {
        path: "/maps/:id",
        element: <MapDetails />,
    },
]);

export default Router;
