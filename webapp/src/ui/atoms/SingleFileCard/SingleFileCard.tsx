import React, {useState} from 'react';
import {TeamFile} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {Card, CardActions, CardContent, IconButton, Tooltip, Typography} from "@mui/material";
import {Download} from "@mui/icons-material";
import { format } from 'date-fns';
import {theme} from "../../../GlobalStyles";
import prettyBytes from "pretty-bytes";
import {useDownloadFile} from "../../../hooks/lighthouse/useDownloadFile";
import DownloadProgress from "./DownloadProgress";

/**
 *
 * @param {React.PropsWithChildren<ISingleFileCard>} props
 * @return {JSX.Element}
 * @constructor
 */
const SingleFileCard: React.FC<ISingleFileCard> = (props) => {

  const [downloadInProgress, setDownloadInProgress] = useState<boolean>(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" sx={{fontWeight: 600}} noWrap={true}>
          {props.teamFile.name}
        </Typography>

        <Typography variant={"body2"} color={theme.palette.text.secondary} sx={{mt: 1}}>
          {format(new Date(props.teamFile.addedAt * 1000), "do LLLL y @ h:mm a")}
        </Typography>

        <Typography variant={"body2"} color={theme.palette.text.secondary} sx={{mt: 1}}>
          {prettyBytes(props.teamFile.size)}
        </Typography>

      </CardContent>

      <CardActions>
        {
          downloadInProgress?
            <DownloadProgress jwt={props.jwt}
                              CID={props.teamFile.CIDFile}
                              walletAddress={props.walletAddress}
                              filename={props.teamFile.name}
                              setCompletedDownload={() => setDownloadInProgress(false)}/>
            :
            <Tooltip title={"Download File"}>
              <IconButton onClick={() => {setDownloadInProgress(true); }}>
                <Download />
              </IconButton>
            </Tooltip>
        }
      </CardActions>
    </Card>
  );
};

export interface ISingleFileCard {
  teamFile: TeamFile,
  walletAddress: string,  //address of the wallet connected
  jwt: string,  //jwt to authenticate calls
}

export default SingleFileCard;
