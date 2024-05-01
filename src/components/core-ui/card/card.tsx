import { Card as MuiCard } from "@mui/material";
import React from "react";

export default function Card({
  children,
  ...other
}: {
  children: React.ReactNode;
}) {
  return <MuiCard {...other}>{children}</MuiCard>;
}
