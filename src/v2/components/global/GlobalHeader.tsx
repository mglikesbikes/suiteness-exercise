import { component$, useContext } from "@builder.io/qwik";
import { RootContext } from "~/v2/contexts/RootContext";
import { PageWidth } from "./PageWidth";

interface GlobalHeaderProps {
  label: string;
  count?: number;
}

export default component$((props: GlobalHeaderProps) => {
  const rootContext = useContext(RootContext);

  return (
    <header class="border-b border-b-slate-500 bg-slate-100 shadow">
      <PageWidth>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">
            {props.label}
            {props.count && (
              <span class="font-normal text-slate-500"> ({props.count})</span>
            )}
          </h1>
          {rootContext.signedIn && rootContext.user ? (
            <p class="text-sm">{rootContext.user.email}</p>
          ) : (
            <p>
              <em>Not signed in</em>
            </p>
          )}
        </div>
      </PageWidth>
    </header>
  );
});
