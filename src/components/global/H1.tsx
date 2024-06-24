import { component$, Slot } from "@builder.io/qwik";

// @todo refactor to <Header level=1/2/3> or <Text heading=1/> depending on usage
export const H1 = component$(() => {
  return (
    <h1 class="text-2xl font-bold">
      <Slot />
    </h1>
  );
});
