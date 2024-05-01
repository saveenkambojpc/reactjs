import { Box, Drawer, Stack, Typography } from "@mui/material";
import { HEADER, NAV } from "../config-layout";
import { isMobileScreen } from "../../../hooks/use-responsive";
import Logo from "../../logo";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { navClose } from "../../../store/features/global/globalSlice";
import SidebarToggler from "./sidebar-toggler";
import { usePathname } from "../../router/hooks/use-pathname";
import { palette } from "../../../theme/palette";
import { sidebarIcons } from "../../icons/icons";
import useGetSessionData from "../../../hooks/useGetSessionData";

interface SidebarItem {
  title: string;
  id: string;
  to: string;
  scopeKey: string;
  children?: SidebarItem[];
}

const CustomSiteLabelBoxStyle = {
  height: HEADER.HEIGHT,
  borderBottom: 1,
  borderColor: "divider",
  position: "sticky",
  top: 0,
  display: "flex",
  alignItems: "center",
  pl: 3,
  backdropFilter: "blur(4px)",
  zIndex: 9999
};

const CustomSiteLabelBox = ({ isMobile }: { isMobile: boolean }) => (

  isMobile ?
    <Box sx={CustomSiteLabelBoxStyle}>
      <Stack direction="row" gap={1} alignItems="center">
        {<SidebarToggler />}
        <Logo />
      </Stack>
    </Box> :
    <Box height={HEADER.HEIGHT}></Box>

);

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = isMobileScreen();
  const dispatch = useAppDispatch();
  const { isNavOpen } = useAppSelector((s) => s.global);

  // const { pages } = useGetSessionData('pagesScope');
  // const { scopes } = useGetSessionData('user');

  const items: SidebarItem[] = [
    // {
    //   title: "Dashboard",
    //   to: "/",
    //   children: [
    //     {
    //       title: "Child 1",
    //       to: "/",
    //       children: [
    //         {
    //           to: "/",
    //           title: "Grandchild 1",
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      id: "dashboard",
      title: "Dashboard",
      to: "/",
      scopeKey: "dashboard",
    },

    {
      id: "family-profile",
      title: "Family Profile",
      to: "/family-profile",
      scopeKey: "family_profile"
    },
    // {
    //   id: "diet-management",
    //   title: "Diet Management",
    //   to: "/diet-management",
    // },
    {
      id: "settings",
      title: "Settings",
      to: "/settings",
      scopeKey: "settings"
    },
    {
      id: "masters",
      title: "Masters",
      to: "#",
      scopeKey: "master",
      children: [
        {
          id: "user-management",
          to: "/user-management",
          title: "Users Management",
          scopeKey: "user_management"
        },
        {
          id: "role-management",
          to: "/role-management",
          title: "Role Management",
          scopeKey: "role_management"
        },
        {
          id: "members-management",
          to: "/members-management",
          title: "Members Management",
          scopeKey: "member"
        },
        {
          id: "feature",
          to: "/feature",
          title: "Feature",
          scopeKey: "feature"
        },
      ],
    },
  ];

  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (index: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const renderButtonAndCollapse = (item: any, index: number) => <>
    <ListItemButton
      sx={
        {
          ...pathname === item.to
            ? {
              background: palette.primary.main,
              color: palette.primary.lighter,
            }
            : {},
          gap: 2,
        }
      }

      onClick={() => handleClick(index.toString())}
    >
      <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>{sidebarIcons[item.id]}</ListItemIcon>

      <Typography fontSize={14}>
        {item.title}
      </Typography>
      {/* <ListItemText  primary={item.title+"edff"} /> */}

      {item.children &&
        (open[index.toString()] ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
    <Collapse in={open[index.toString()]} timeout="auto" unmountOnExit>
      {item.children && <RenderSubMenuComp parentId={index.toString()} depth={1} subItems={item.children} />}
    </Collapse>
  </>

  // new
  const renderContent = (
    <Box sx={{ position: "sticky", top: 0 }}>
      <CustomSiteLabelBox isMobile={isMobile} />

      {isNavOpen &&

        <List component="div" sx={{ px: 1 }}>
          {items.map((item, index) => (
            <React.Fragment key={item.id || index}>
              {!item.children ? (
                <NavLink to={item.to}>
                  {renderButtonAndCollapse(item, index)}
                </NavLink>
              ) : (
                renderButtonAndCollapse(item, index)
              )}
            </React.Fragment>
          ))}
        </List>

      }
    </Box>
  );

  // DESKTOP
  return !isMobile ? (
    isNavOpen ? <Box
      sx={{
        minWidth: NAV.WIDTH,
        minHeight: "100vh",
      }}
    >
      {renderContent}
    </Box> : null
  ) : (
    <Drawer
      open={isNavOpen}
      onClose={() => dispatch(navClose())}
      sx={{
        height: 1,
        background: "rgba(0, 0, 0, 0.1)",

      }}
      PaperProps={{
        sx: {
          width: NAV.WIDTH,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}


// recursive component
const RenderSubMenuComp = ({ subItems, parentId, depth }: {
  subItems: SidebarItem[],
  parentId: string,
  depth: number
}
) => {

  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (index: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const pathname = usePathname()
  return (
    <List component="div" disablePadding>
      {subItems.map((subItem, index) => (
        <div key={parentId + "-" + index}>
          <NavLink to={subItem.to} key={index}>
            <ListItemButton
              style={{ paddingLeft: 32 * depth }}
              sx={
                {
                  ...pathname === subItem.to
                    ? {
                      background: palette.primary.main,
                      color: palette.primary.lighter,
                    }
                    : {},
                  gap: 2,
                }
              }
              onClick={() => handleClick(index.toString())}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>{sidebarIcons[subItem.id]}</ListItemIcon>
              {/* <ListItemText primary={subItem.title} /> */}

              <Typography fontSize={14}>
                {subItem.title}
              </Typography>
              {subItem.children &&
                (open[parentId + "-" + index] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                ))}
            </ListItemButton>
            <Collapse
              in={open[parentId + "-" + index]}
              timeout="auto"
              unmountOnExit
            >
              {subItem.children &&
                <RenderSubMenuComp parentId={parentId + "-" + index} depth={depth + 1} subItems={subItem.children} />}
            </Collapse>
          </NavLink>
        </div>
      ))}
    </List>
  );
};
