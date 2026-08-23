import type { PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "sonner";
import { apolloClient } from "./apollo.ts";

export function ApolloAppProvider({ children }: PropsWithChildren): React.ReactNode {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "font-body border-line bg-surface text-ink shadow-[0_12px_40px_rgba(18,22,29,0.12)]",
            title: "font-body",
            description: "font-body text-muted",
          },
        }}
      />
    </ApolloProvider>
  );
}
