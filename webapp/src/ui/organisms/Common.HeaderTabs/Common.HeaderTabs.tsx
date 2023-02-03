import React, {useMemo} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {Folder, Phone} from "@mui/icons-material";
import {useLocation, useNavigate, useParams} from "react-router";

/**
 *
 * @param {React.PropsWithChildren<ICommonHeaderTabs>} props
 * @return {JSX.Element}
 * @constructor
 */
const CommonHeaderTabs: React.FC<ICommonHeaderTabs> = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { teamAddress } = useParams();

  const tabValue = useMemo((): number => {
    let archiveRegex = /^\/team\/0x[a-fA-F0-9]{40}\/archive$/;
    let meetingRegex = /^\/team\/0x[a-fA-F0-9]{40}\/meeting$/;
    if (archiveRegex.test(location.pathname)) return 0;
    if (meetingRegex.test(location.pathname)) return 1;
    throw new Error("Need to implement the case for the tab");
  }, [location]);

  const goToArchive = () => {
    navigate(`/team/${teamAddress}/archive`);
  }

  const goToMeeting = () => {
    navigate(`/team/${teamAddress}/meeting`);
  }

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Tabs value={tabValue} onChange={() => {}} aria-label="icon tabs example">
        <Tab icon={<Folder />} aria-label="phone" label={"Team Archive"} onClick={goToArchive} />
        {/*<Tab icon={<Phone />} aria-label="favorite" label={"Meetings"}  onClick={goToMeeting} />*/}
      </Tabs>
    </Box>
  );
};

export interface ICommonHeaderTabs {

}

export default CommonHeaderTabs;
