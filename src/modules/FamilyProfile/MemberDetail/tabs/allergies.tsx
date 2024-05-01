import { useLocation } from "react-router-dom";
import { AllergiesTable } from "../../../Master/Allergies/Table";

export default function Allergies() {
  const {
    state: { id: userId },
  } = useLocation();



  return (
    <>
      <AllergiesTable tableName="Allergies" filterByUserId={userId} />
    </>
  );
}
