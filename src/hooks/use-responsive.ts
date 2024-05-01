import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

export function useResponsive(query: string, start: Breakpoint) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  return mediaOnly;
}


export const isMobileScreen = ()=> useResponsive("down", "lg")
export const isDesktopScreen = ()=> useResponsive("up", "lg")