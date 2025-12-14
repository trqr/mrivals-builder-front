import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { LinearProgress } from "@mui/material";
import { useLoading } from "../../hooks/useLoading.tsx";
import { useEffect, useState } from "react";

const Layout = () => {
    const { isPending } = useLoading();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <LinearProgress
                sx={{
                    height: "2px", position: "sticky", top: scrolled ? "70px" : "80px", width: "100%", opacity: scrolled ? 0.7 : 1,
                    transition: "all 0.3s ease-in-out", zIndex: 999
                }}
                variant={isPending ? "indeterminate" : "determinate"}
                value={isPending ? undefined : 100}
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;