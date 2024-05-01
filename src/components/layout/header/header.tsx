import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { HEADER} from "../config-layout";
import Logo from "../../logo";
import SidebarToggler from "../Sidebar/sidebar-toggler";
import { Stack } from "@mui/material";
import { AccountMenu } from ".";

const StyledAppBar = styled(AppBar)(({ theme }) => {

  return theme.unstable_sx({
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 1,
    borderStyle: "solid",
    position: "fixed",
    left: "auto",
    backdropFilter: "blur(4px)",
    right: 0,
    // width: isMobile ? "100%" : `calc(100% - ${NAV.WIDTH}px)`,
    // width: "100%",
    color: "black",
    borderColor: "divider",
    height: HEADER.HEIGHT,
    display: "flex",
    justifyContent: "center",
    zIndex: 1000
  });
});

export default function Header() {


  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* {!lgUp ? (
          <Box></Box>
        ) : (
          <Stack direction="row" gap={1} alignItems="center">
            <SidebarToggler />
            <Logo />
          </Stack>
        )} */}


        <Stack direction="row" gap={1} alignItems="center">
          <SidebarToggler />
          <Logo />
        </Stack>


        <Box>
          <AccountMenu />
        </Box>

      </Toolbar>
    </StyledAppBar>
  );
}
