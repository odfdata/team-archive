import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useNetwork} from "wagmi";
import {Box, Tab, Tabs} from "@mui/material";
import {Folder, Phone} from "@mui/icons-material";
import CommonBasePageStructure from "../../organisms/Common.BasePageStructure/Common.BasePageStructure";

/**
 *
 * @param {React.PropsWithChildren<ITeamHomepage>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchive: React.FC<ITeamHomepage> = (props) => {
  const { teamAddress } = useParams();
  const network = useNetwork();

  const teamFiles = useGetTeamFiles({
    amount: 100,
    chainId: network.chain.id,
    teamAddress: teamAddress,
    reverse: true,
    startId: 123456
  });

  useEffect(() => {
    if (teamFiles.completed && teamFiles.error === "" && teamFiles.result ) {
      alert("File list downloaded");
    }
  }, [teamFiles.completed])

  // evaluate the current tab

  return (
    <CommonBasePageStructure>
      team page {teamAddress}
    </CommonBasePageStructure>
  );
};

export interface ITeamHomepage {

}

export default TeamArchive;
