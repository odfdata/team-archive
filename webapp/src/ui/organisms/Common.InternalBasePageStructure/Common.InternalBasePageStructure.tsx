import React, {useEffect} from 'react';
import {Box, Container} from "@mui/material";
import CommonHeaderTabs from "../Common.HeaderTabs/Common.HeaderTabs";
import {useAppSelector} from "../../../hooks/redux/reduxHooks";
import {useNavigate} from "react-router";

/**
 *
 * @param {React.PropsWithChildren<ICommonInternalBasePageStructure>} props
 * @return {JSX.Element}
 * @constructor
 */
const CommonInternalBasePageStructure: React.FC<ICommonInternalBasePageStructure> = (props) => {

  const userJWT = useAppSelector(state => state.user.userJWT);
  const navigate = useNavigate();

  useEffect(() => {
    if (userJWT === "") {
      navigate(`/`);
    }
  }, [userJWT]);

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

export interface ICommonInternalBasePageStructure {
  children: React.ReactNode
}

export default CommonInternalBasePageStructure;
