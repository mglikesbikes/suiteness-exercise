import { component$, Slot } from "@builder.io/qwik";

interface Props {
  flex?: "row" | "col";
  gap?: "sm" | "md" | "lg" | "auto";
}

export const Container = component$((props: Props) => {
  return (
    <div
      class={{
        "m-auto max-w-2xl p-4": true,
        flex: props.flex,
        "flex-row": props.flex === "row",
        "flex-col": props.flex === "col",
      }}
    >
      <Slot />
    </div>
  );
});
