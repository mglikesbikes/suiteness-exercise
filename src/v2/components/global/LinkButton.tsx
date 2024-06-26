import { component$, Slot } from "@builder.io/qwik";

interface LinkButtonProps {
  href: string;
  ariaLabel: string;
  extraClasses?: string;
}

export const LinkButton = component$((props: LinkButtonProps) => {
  return (
    <a
      href={props.href}
      aria-label={props.ariaLabel}
      class={`inline-flex items-center gap-1 self-start rounded border border-slate-100 bg-slate-800 p-2 font-bold text-white hover:underline ${props.extraClasses}`}
    >
      <Slot />
    </a>
  );
});
