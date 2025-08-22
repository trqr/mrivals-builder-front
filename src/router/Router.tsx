import {Route, Routes} from "react-router";
import HeroList from "../pages/HeroList.tsx";
import Admin from "../pages/Admin.tsx";
import Builder from "../pages/Builder.tsx";
import CompoDetails from "../pages/CompoDetails.tsx";
import HeroDetails from "../pages/HeroDetails.tsx";
import Home from "../pages/Home.tsx";
import MapDetails from "../pages/MapDetails.tsx";
import MapList from "../pages/MapList.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Builder" element={<Builder/>}/>
            <Route path="/CompoDetails" element={<CompoDetails/>}/>
            <Route path="/HeroDetails/:heroId" element={<HeroDetails/>}/>
            <Route path="/HeroList" element={<HeroList/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/MapDetails/:mapId" element={<MapDetails/>}/>
            <Route path="/MapList" element={<MapList/>}/>
        </Routes>
    )
}
export default Router;