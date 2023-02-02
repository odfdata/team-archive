import React, {useEffect} from 'react';
import {Box, CircularProgress} from "@mui/material";
import {useDownloadFile} from "../../../hooks/lighthouse/useDownloadFile";

/**
 *
 * @param {React.PropsWithChildren<IDownloadProgress>} props
 * @return {JSX.Element}
 * @constructor
 */
const DownloadProgress: React.FC<IDownloadProgress> = (props) => {

  const file = useDownloadFile({
    CID: props.CID,
    publicKey: props.walletAddress,
    jwt: props.jwt
  })

  useEffect(() => {
    if (file.completed && file.error === "") {
      const a = document.createElement('a');
      const url = URL.createObjectURL(file.result.decrypted); // Create an object URL from blob
      a.setAttribute('href', url); // Set "a" element link
      a.setAttribute('download', props.filename); // Set download filename
      a.click();
      props.setCompletedDownload();
    }
  }, [file.completed])

  return (
    <Box>
      <CircularProgress size={18}/>
    </Box>
  );
};

export interface IDownloadProgress {
  filename: string,  // name of the file downloaded
  CID: string,  // cid of the file to download
  walletAddress: string,  //address of the wallet connected
  jwt: string,  //jwt to authenticate calls
  setCompletedDownload: () => void  //sets to the parent component the download completed
}

export default DownloadProgress;
