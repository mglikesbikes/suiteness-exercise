import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { getInitialRootContext, RootContext } from "~/v2/contexts/RootContext";
import { Footer } from "~/components/global/Footer";
import { usePing } from "~/v2/loaders/Ping";

export { usePing } from "~/v2/loaders/Ping";

export default component$(() => {
  const rootContext = useStore(getInitialRootContext());
  useContextProvider(RootContext, rootContext);

  const ping = usePing();

  if ("email" in ping.value && ping.value.email) {
    rootContext.signedIn = true;
    rootContext.user = { email: ping.value.email };
  }

  return (
    <>
      <Slot />
      <Footer />
    </>
  );
});
