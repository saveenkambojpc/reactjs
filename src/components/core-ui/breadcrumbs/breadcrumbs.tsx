import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";

export default function Breadcrumbs({
  arr = [],
}: {
  arr: { label: string; to: string, state?:any }[];
}) {
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 1 }}
    >
      {arr.map((item: any, ind: number) =>
        ind + 1 !== arr.length ? (
          <RouterLink state={item?.state} key={ind} to={item.to} style={{ border: 1 }}>
            <Link component={Box} color={"text.primary"} underline="hover">
              {item.label}
            </Link>
          </RouterLink>
        ) : (
          <Link  fontWeight={600} key={ind}>{item.label}</Link>
        )
      )}
    </MuiBreadcrumbs>
  );
}
