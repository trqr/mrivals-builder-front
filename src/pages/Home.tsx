import Header from "../componnents/header/Header.tsx";
import {Button} from "@mui/material";
import './Home.css';
import affiche from "../image/affiche.jpeg"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
    return (
        <>
            <Header></Header>
            <div style={{ marginTop: "80px" }}></div>
            <Box
                className="actuality"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 4,
                    padding: "20px"
                }}
            >
                {/* Image à gauche */}
                <img
                    className="image"
                    src={affiche}
                    alt="affiche de la saison 3.5"
                    style={{
                        width: "500px",
                        height: "auto",
                        borderRadius: "10px"
                    }}
                />

                {/* Texte à droite */}
                <Typography sx={{ flex: 1, textAlign: "justify", marginLeft: "60px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                </Typography>
            </Box>
            <div className="caroussel"></div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <Button className={"teambuildButton"}
            sx={{padding: '30px',
                color: 'black',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',}}>Teambuild</Button>
            </div>

        </>
    )
}

export default Home;