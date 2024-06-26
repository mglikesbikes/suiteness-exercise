import { createContextId } from "@builder.io/qwik";
import { type User } from "../schemas/UserSchema";

export type RootContextType = {
  signedIn: boolean;
  user: User | null;
};

export const RootContext = createContextId<RootContextType>("root");

export const getInitialRootContext = (): RootContextType => {
  return {
    signedIn: false,
    user: null,
  };
};
