import { component$, Slot } from "@builder.io/qwik";

type AttributeDisplayProps = {
  label: string;
  class?: string;
};

export const AttributeDisplay = component$((props: AttributeDisplayProps) => {
  return (
    <div class={props.class}>
      <dt class="text-xs font-bold uppercase text-slate-500">{props.label}</dt>
      <dd class="break-words">
        <Slot />
      </dd>
    </div>
  );
});
