import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { TabsModel } from "../../../types/core-ui/TabsModel";

type CustomTabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};
function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabs({ tabs , initialSelectedTabIndex = 0}: { tabs: TabsModel, initialSelectedTabIndex?: number }) {
  const [value, setValue] = React.useState<number>(initialSelectedTabIndex);

  // const tabs = [
  //     {
  //         index: 0,
  //         label: 'Allergies',
  //         content: <div>Allergies</div>,
  //     },
  // ];

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, ind) => (
            <Tab label={tab.label} key={ind} {...a11yProps(tab.index)} />
          ))}
        </MuiTabs>
      </Box>

      {tabs.map((tab, ind) => (
        <CustomTabPanel key={ind} value={value} index={tab.index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

// MemberProfileTabs.propTypes = {
//   id: PropTypes.string,
// };
