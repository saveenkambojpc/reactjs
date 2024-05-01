import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout";
import HomePage from "../../pages/Home";
import { LoginPage } from "../../pages/Login";
import { FamilyProfilePage } from "../../pages/FamilyProfile";
import { UserManagementPage } from "../../pages/Master/UserManagement";
import RoleManagementPage from "../../pages/Master/RoleManagement/role-managemet-page";
import { MemberDetailPage } from "../../pages/FamilyProfile/MemberDetailPage";
import { DietManagementPage } from "../../pages/Master/DietManagement";
import { SettingsPage } from "../../pages/Settings";
import { DocumentPage } from "../../pages/Master/Document";
import { MedicationPage } from "../../pages/Master/Medication";
import { TreatmentPage } from "../../pages/Master/Treatment";
import { FeaturePage } from "../../pages/Master/Feature";
import { MembersManagementPage } from "../../pages/Master/MembersManagement";

const RoutesProvider = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="family-profile">
        <Route index element={<FamilyProfilePage />} />
        <Route path=":id">
          <Route index element={<MemberDetailPage />} />
          <Route path="diet" element={<DietManagementPage />} />
          <Route path="document" element={<DocumentPage />} />
          <Route path="medication">
            <Route index element={<MedicationPage />} />
            <Route path="document" element={<DocumentPage />} />
          </Route>

          {/* TREATMENT */}
          <Route path="treatment">
            <Route index element={<TreatmentPage  />} />
            <Route path="document" element={<DocumentPage />} />
          </Route>

          {/* <Route path="treatment" element={<TreatmentPage />} /> */}
        </Route>
      </Route>

      <Route path="diet-management" element={<DietManagementPage />} />
      <Route path="medication-management" element={<SettingsPage />} />
      <Route path="user-management" element={<UserManagementPage />} />
      <Route path="role-management" element={<RoleManagementPage />} />
      <Route path="members-management" element={<MembersManagementPage />} />
      <Route path="feature" element={<FeaturePage />} />
    </Route>
    <Route path="login" element={<LoginPage />} />
  </Routes>
);
export default RoutesProvider;
