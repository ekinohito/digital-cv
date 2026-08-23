import { Outlet } from "react-router-dom";
import { PublicFooter } from "./PublicFooter.tsx";
import { PublicHeader } from "./PublicHeader.tsx";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
