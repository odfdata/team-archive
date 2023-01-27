import React from 'react';
import {Box, Container} from "@mui/material";
import CommonHeaderTabs from "../Common.HeaderTabs/Common.HeaderTabs";

/**
 *
 * @param {React.PropsWithChildren<ICommonBasePageStructure>} props
 * @return {JSX.Element}
 * @constructor
 */
const CommonBasePageStructure: React.FC<ICommonBasePageStructure> = (props) => {
  return (
    <Box width={"100vw"} px={2} py={2}>
      <Container>
        <CommonHeaderTabs/>
        <Box width={"100%"} mt={2} display={"flex"} flexDirection={"column"}>
          {
            props.children
          }
        </Box>
      </Container>
    </Box>
  );
};

export interface ICommonBasePageStructure {
  children: React.ReactNode
}

export default CommonBasePageStructure;
