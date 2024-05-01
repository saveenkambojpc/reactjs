import Box from "@mui/material/Box";
import { NAV, HEADER } from "./config-layout";
import React from "react";
import { isDesktopScreen, useResponsive } from "../../hooks/use-responsive";
import { useAppDispatch } from "../../store/hooks";
import { navClose, navOpen } from "../../store/features/global/globalSlice";

// ----------------------------------------------------------------------

const SPACING = 16;

type MainProps = {
  children: React.ReactNode;
  sx?: any;
};
export default function Main({ children, sx, ...other }: MainProps) {
  const lgUp = useResponsive("up", "lg");
  const dispatch = useAppDispatch()
  const isDesktop = isDesktopScreen()

  React.useEffect(() => {
    const handleResize = () => {
      dispatch(isDesktop ? navOpen() : navClose())
    };

    // Set the initial state based on current window size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, isDesktop]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",

        flexDirection: "column",
        px: 2,
        py: `${HEADER.HEIGHT + SPACING}px`,
        ...(lgUp ? {
          px: 4,
          py: `${HEADER.HEIGHT + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        } : {

        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
