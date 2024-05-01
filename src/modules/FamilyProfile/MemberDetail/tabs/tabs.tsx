import {
  Allergies,
  Appointments,
  Diagnose,
  DietPlans,
  UploadDocument,
  Medication,
} from ".";
import { TabsModel } from "../../../../types/core-ui/TabsModel";

export const tabs: TabsModel = [
  {
    index: 0,
    label: "Appointments",
    content: <Appointments />,
  },
  {
    index: 1,
    label: "Diet Plans",
    content: <DietPlans />,
  },
  {
    index: 2,
    label: "Diagnosis",
    content: <Diagnose />,
  },
  {
    index: 3,
    label: "Allergies",
    content: <Allergies />,
  },
  {
    index: 4,
    label: "Upload Document",
    content: <UploadDocument />,
  },
  {
    index: 5,
    label: "Medication",
    content: <Medication />,
  },
];
