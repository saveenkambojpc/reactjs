import {
  Add,
  BreakfastDining,
  CheckCircle,
  Delete,
  DinnerDining,
  Edit,
  FeaturedPlayList,
  LunchDining,
  ManageHistory,
  MenuBook,
  Settings,
  UploadFile,
  Vaccines
} from "@mui/icons-material";

import {
  Group,
  FoodBank,
  Dashboard,
  Medication,
  ManageAccounts,
  DocumentScannerTwoTone,
  CardMembership
} from "@mui/icons-material";

import {
  MedicationLiquid,
} from "@mui/icons-material";

// EDIT
export const EditIcon = () => <Edit />;

// DELETE
export const DeleteIcon = () => <Delete />;

// ADD
export const AddIcon = () => <Add />;

// active, inactive
export const ActiveIcon = () => <CheckCircle color="success" />;
export const InActiveIcon = () => <CheckCircle color="disabled" />;

export const sidebarIcons: { [key: string]: React.ReactNode } = {
  dashboard: <Dashboard />,
  "family-profile": <FoodBank />,
  "diet-management": <FoodBank />,
  "medication-management": <Medication />,
  documents: <Medication />,
  "manage-document": <DocumentScannerTwoTone />,
  "user-group": <Group />,
  master: <Group />,
  "user-management": <Group />,
  "role-management": <ManageAccounts />,
  "members-management": <CardMembership />,
  settings: <Settings />,
  masters: <ManageHistory />,
  feature:<FeaturedPlayList />
};


export const mealIcons: { [key: string]: React.ReactNode } = {
  "breakfast": <BreakfastDining sx={{ fontSize: 48 }}
    color="primary" />,
  "middaymeal": <LunchDining sx={{ fontSize: 48 }}
    color="info" />,
  "lunch": <LunchDining sx={{ fontSize: 48 }}
    color="error" />,
  "evening": <LunchDining sx={{ fontSize: 48 }}
    color="warning" />,
  "dinner": <DinnerDining sx={{ fontSize: 48 }}
    color="success" />,
}


export const featureIcons: { [key: string]: React.ReactNode } = {
  diet: <MenuBook sx={{ fontSize: 96 }}
    color="info" />,
  medication: <MedicationLiquid sx={{ fontSize: 96 }}
    color="success" />,
  treatment: <Vaccines sx={{ fontSize: 96 }}
    color="error" />,
  document: <UploadFile sx={{ fontSize: 96 }} color="primary" />,
}