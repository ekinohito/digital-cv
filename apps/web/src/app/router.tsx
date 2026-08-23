import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout.tsx";
import { ArchitecturePage } from "../pages/ArchitecturePage.tsx";
import { PortfolioPage } from "../pages/PortfolioPage.tsx";
import { AdminGate } from "../pages/admin/AdminGate.tsx";
import { AdminLayout } from "../pages/admin/AdminLayout.tsx";
import { AssetsAdminPage } from "../pages/admin/AssetsAdminPage.tsx";
import { ExperienceAdminPage } from "../pages/admin/ExperienceAdminPage.tsx";
import { LinksAdminPage } from "../pages/admin/LinksAdminPage.tsx";
import { ProfileAdminPage } from "../pages/admin/ProfileAdminPage.tsx";
import { ProjectsAdminPage } from "../pages/admin/ProjectsAdminPage.tsx";
import { SkillsAdminPage } from "../pages/admin/SkillsAdminPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <PortfolioPage /> },
      { path: "architecture", element: <ArchitecturePage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminGate />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <ProfileAdminPage /> },
          { path: "experience", element: <ExperienceAdminPage /> },
          { path: "projects", element: <ProjectsAdminPage /> },
          { path: "skills", element: <SkillsAdminPage /> },
          { path: "links", element: <LinksAdminPage /> },
          { path: "assets", element: <AssetsAdminPage /> },
        ],
      },
    ],
  },
]);
