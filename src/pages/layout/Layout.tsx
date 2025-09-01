import { Outlet } from "react-router-dom";
import Header from "../../componnents/header/Header.tsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Layout;