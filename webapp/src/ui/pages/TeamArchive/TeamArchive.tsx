import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router';
import {TeamFile, useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useAccount, useNetwork} from "wagmi";
import {Box, CircularProgress} from "@mui/material";
import CommonInternalBasePageStructure from "../../organisms/Common.InternalBasePageStructure/Common.InternalBasePageStructure";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import TeamArchiveSearchAndAddButton
  from "../../organisms/TeamArchive.SearchAndAddButton/TeamArchive.SearchAndAddButton";
import {fileReducerActions} from "../../../store/reducers/file";
import SingleFileCard from "../../atoms/SingleFileCard/SingleFileCard";
import Grid2 from "@mui/material/Unstable_Grid2";

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
  const [filterValue, setFilterValue] = useState<string>("");
  const userJWT = useAppSelector(state => state.user.userJWT);
  const fileList = useAppSelector(state => state.file.fileList);

  const teamFiles = useGetTeamFiles({
    amount: 100,
    chainId: network.chain.id,
    teamAddress: teamAddress,
    reverse: true,
    jwt: userJWT,
    publicKey: account.address,
    enabled: userJWT !== ""
  });

  useEffect(() => {
    if (teamFiles.completed && teamFiles.error === "" && teamFiles.result ) {
      dispatch(fileReducerActions.setFileList(teamFiles.result.teamFiles));
    }
  }, [teamFiles.completed, teamFiles.result])

  const filter = (filterValue: string) => setFilterValue(filterValue);

  const visibleFiles: TeamFile[] = useMemo(() => {
    return fileList.filter(f => f.name.includes(filterValue));
  }, [filter, fileList]);


  return (
    <CommonInternalBasePageStructure>

      <Box mt={4}>
        <TeamArchiveSearchAndAddButton filter={filter}/>
      </Box>

      <Box mt={4}>
        {
          teamFiles.loading && fileList.length === 0?
            <CircularProgress/>
            :
            ""
        }
        <Grid2 container spacing={2}>
          {
            visibleFiles.map(f =>
              <Grid2 xs={4} key={f.CIDMetadata}>
                <SingleFileCard teamFile={f} jwt={userJWT} walletAddress={account.address}/>
              </Grid2>
            )
          }
        </Grid2>
      </Box>


    </CommonInternalBasePageStructure>
  );
};

export interface ITeamHomepage {

}

export default TeamArchive;
