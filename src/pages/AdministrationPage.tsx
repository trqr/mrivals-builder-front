import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";

const AdministrationPage = () => {
    const users = useLoaderData();
    return (
        <>
            <Typography variant={"h1"}>Admin</Typography>
            {users.map((user) => (
                <Typography>{user.id}</Typography>
            ))}
        </>
    )
}

export default AdministrationPage;