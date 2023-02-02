import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useAccount, useNetwork} from "wagmi";
import {Box} from "@mui/material";
import CommonInternalBasePageStructure from "../../organisms/Common.InternalBasePageStructure/Common.InternalBasePageStructure";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import TeamArchiveSearchAndAddButton
  from "../../organisms/TeamArchive.SearchAndAddButton/TeamArchive.SearchAndAddButton";

/**
 *
 * @param {React.PropsWithChildren<ITeamHomepage>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchive: React.FC<ITeamHomepage> = (props) => {
  const { teamAddress } = useParams();
  const network = useNetwork();
  const dispatch = useAppDispatch();
  const account = useAccount();
  const userJWT = useAppSelector(state => state.user.userJWT);

  const teamFiles = useGetTeamFiles({
    amount: 100,
    chainId: network.chain.id,
    teamAddress: teamAddress,
    reverse: true,
    jwt: userJWT,
    publicKey: account.address
  });

  useEffect(() => {
    if (teamFiles.completed && teamFiles.error === "" && teamFiles.result ) {
      console.log(teamFiles.result);
      // dispatch(fileReducerActions.setFileList(teamFiles.result.teamFiles));
    }

  }, [teamFiles.completed])

  // evaluate the current tab

  return (
    <CommonInternalBasePageStructure>

      <Box mt={4}>
        <TeamArchiveSearchAndAddButton/>
      </Box>



    </CommonInternalBasePageStructure>
  );
};

export interface ITeamHomepage {

}

export default TeamArchive;
