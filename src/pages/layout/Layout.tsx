import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import {LinearProgress} from "@mui/material";
import {useLoading} from "../../hooks/useLoading.tsx";

const Layout = () => {
    const {isPending} = useLoading();

    return (
        <>
            <Header/>
            <LinearProgress
                sx={{ height: "2px" }}
                variant={isPending ? "indeterminate" : "determinate"}
                value={isPending ? undefined : 100}
            />
            <Outlet/>
        </>
    )
}

export default Layout;