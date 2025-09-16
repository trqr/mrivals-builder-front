import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, LinearProgress, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import HeroesManagement from "../../componnents/administration/heroesManagement/HeroesManagement.tsx";
import UsersManagement from "../../componnents/administration/usersManagement/UsersManagement.tsx";
import {useState, useTransition} from "react";
import {DataManagement} from "../../componnents/administration/dataManagement/DataManagement.tsx";
import Page from "../layout/Page.tsx";

const AdministrationPage = () => {
    const users = useLoaderData();
    const [value, setValue] = useState('1');
    const [isPending, startTransition] = useTransition()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Page title={"Administration"} description={"Administration page"}>
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Administration panel</Typography>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Users" value="1"/>
                            <Tab label="Heroes"  value="2"/>
                            <Tab label="Updates" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <UsersManagement users={users}></UsersManagement>
                    </TabPanel>
                    <TabPanel value="2">
                        <HeroesManagement></HeroesManagement>
                    </TabPanel>
                    <TabPanel value="3">
                        <DataManagement></DataManagement>
                    </TabPanel>
                </TabContext>
            </Box>
        </Page>
    )
}

export default AdministrationPage;