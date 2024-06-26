import { component$, type DOMAttributes, Slot } from "@builder.io/qwik";

export interface AttributeDisplayProps {
  label: string;
  class?: DOMAttributes<HTMLDivElement>["class"];
}

export const eyebrowClass = "text-xs font-bold uppercase text-slate-500";

export const AttributeDisplay = component$((props: AttributeDisplayProps) => {
  return (
    <div class={props.class}>
      <dt class={eyebrowClass}>{props.label}</dt>
      <dd>
        <Slot />
      </dd>
    </div>
  );
});
