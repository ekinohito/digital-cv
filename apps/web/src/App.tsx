import { RouterProvider } from "react-router-dom";
import { I18nProvider } from "./app/i18n.ts";
import { ApolloAppProvider } from "./app/providers.tsx";
import { router } from "./app/router.tsx";

function App() {
  return (
    <ApolloAppProvider>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </ApolloAppProvider>
  );
}

export default App;
