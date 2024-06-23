import { component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { H1 } from "./H1";

export const Header = component$(({ email }: { email?: string }) => {
  return (
    <header class="bg-slate-200 shadow-sm">
      <Container>
        <div class="sm:flex sm:items-end sm:justify-between">
          <div>
            <H1>Bookings</H1>
            <p>Manage your Suiteness bookings.</p>
          </div>
          {email && (
            <p>
              <span class="text-sm">Signed in as:</span>
              <br />
              {email}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
});
