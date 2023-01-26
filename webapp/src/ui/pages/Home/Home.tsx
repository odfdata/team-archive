import {Box} from '@mui/material';
import React from 'react';

/**
 *
 * @param {React.PropsWithChildren<IHome>} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: React.FC<IHome> = (props) => {

  return (
    <Box width={"100%"} minHeight={"100vh"}
         display={"flex"} flexDirection={"column"}>
      Hello!
    </Box>
  );
};

export interface IHome {

}

export default Home;
