// @vitest-environment jsdom
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vite-plus/test";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { I18nProvider } from "../../app/i18n.ts";
import { AdminAccessQuery } from "../../features/admin/admin.graphql.ts";
import { clearAdminToken, setAdminToken } from "../../lib/admin-token.ts";
import { AdminGate } from "./AdminGate.tsx";

function renderGate(result: { data?: { adminAccess: boolean }; error?: Error }) {
  const mock = result.error
    ? { request: { query: AdminAccessQuery }, error: result.error }
    : { request: { query: AdminAccessQuery }, result: { data: result.data } };

  return render(
    <MockedProvider mocks={[mock]}>
      <I18nProvider>
        <MemoryRouter initialEntries={["/admin/profile"]}>
          <Routes>
            <Route path="/admin" element={<AdminGate />}>
              <Route path="profile" element={<p>Admin editor</p>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </I18nProvider>
    </MockedProvider>,
  );
}

describe("AdminGate", () => {
  beforeEach(() => {
    clearAdminToken();
    vi.restoreAllMocks();
  });

  test("rejects an invalid token and returns to login", async () => {
    setAdminToken("invalid");
    renderGate({ error: new Error("Invalid admin token") });

    expect(await screen.findByText("Open the workspace")).toBeTruthy();
    expect(sessionStorage.getItem("digital-cv.admin-token")).toBeNull();
  });

  test("renders the editor for a valid token", async () => {
    setAdminToken("valid");
    renderGate({ data: { adminAccess: true } });

    expect(await screen.findByText("Admin editor")).toBeTruthy();
  });
});
