import { Stack } from "@mui/material";
import React from "react";

export default function PageTitleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
      mt={1}
    >{children}</Stack>
  );
}
