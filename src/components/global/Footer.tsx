import { component$ } from "@builder.io/qwik";
import { Container } from "./Container";

export const Footer = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class="bg-slate-500 text-sm text-slate-300">
      <Container>
        <p>&copy; {year} Suiteness, Inc.</p>
      </Container>
    </footer>
  );
});
