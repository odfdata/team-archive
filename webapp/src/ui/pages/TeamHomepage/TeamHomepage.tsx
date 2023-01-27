import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useNetwork} from "wagmi";

/**
 *
 * @param {React.PropsWithChildren<ITeamHomepage>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamHomepage: React.FC<ITeamHomepage> = (props) => {
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

  return (
    <div>
      Team homepage for {teamAddress}
    </div>
  );
};

export interface ITeamHomepage {

}

export default TeamHomepage;
