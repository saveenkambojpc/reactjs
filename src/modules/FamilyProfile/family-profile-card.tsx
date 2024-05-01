import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Card } from "@mui/material";
import { Done, Warning } from "@mui/icons-material";
import { UserModel } from "../../types/api/UserModel";
import DummyUserImage from "/assets/images/avatars/dummy.png"

// ----------------------------------------------------------------------

type FamilyProfileCardProps = {
  data: UserModel;
  sx?: object;
};

export default function FamilyProfileCard({
  data,
  sx,
  ...other
}: FamilyProfileCardProps) {
  const { id, name } = data;
  // const avatarUrl = "", id = "", name = "", health_status = "healthy"

  return (
    <Link
      to={id}
      state={data}

    >
      <Card
        component={Stack}
        spacing={3}
        direction="row"
        sx={{
          px: 3,
          py: 4,
          borderRadius: 2,
          ...sx,
        }}
        {...other}
      >
        {/* {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>} */}
        {true && (
          <Box sx={{ width: 60, height: 60 }}>
            <img
              alt="icon"
              style={{ borderRadius: "50%", height: "inherit" }}
              src={DummyUserImage}
            />
          </Box>
        )}

        <Stack spacing={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.primary", textDecoration: "none" }}
          >
            {name}
          </Typography>

          {"healthy" === "healthy" ? (
            <Done color="success" />
          ) : (
            <Warning color="warning" />
          )}
        </Stack>
      </Card>
    </Link>
  );
}
