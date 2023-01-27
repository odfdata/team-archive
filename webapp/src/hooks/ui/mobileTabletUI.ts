import {useMediaQuery} from "@mui/material";
import {theme} from "../../GlobalStyles";

export const useIsMobile = (): boolean => {
  return useMediaQuery(theme.breakpoints.down("sm"));
}

export const useIsTablet = (): boolean => {
  return useMediaQuery(theme.breakpoints.down("md"));
}
