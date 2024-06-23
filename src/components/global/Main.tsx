import { component$, Slot } from "@builder.io/qwik";
import { Container } from "./Container";

export const Main = component$(() => {
  return (
    <main class="min-h-screen">
      <Container>
        <Slot />
      </Container>
    </main>
  );
});
