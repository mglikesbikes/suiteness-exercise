import { component$, Slot } from "@builder.io/qwik";

export const PageWidth = component$(() => {
  return (
    <div class="m-auto max-w-2xl p-4">
      <Slot />
    </div>
  );
});
