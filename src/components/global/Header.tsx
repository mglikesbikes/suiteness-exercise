import { component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { H1 } from "./H1";
import { useLocation } from "@builder.io/qwik-city";
import { AttributeDisplay } from "./AttributeDisplay";

export const Header = component$(({ email }: { email?: string }) => {
  const location = useLocation();

  if (location.url.pathname.startsWith("/booking")) return <></>;

  return (
    <header class="bg-slate-200 shadow-sm">
      <Container>
        <div class="flex flex-col gap-2 sm:justify-between md:flex-row md:items-center">
          <div>
            <H1>My Bookings</H1>
          </div>
          {email && (
            <dl class="flex flex-col gap-0">
              <AttributeDisplay label="Account">{email}</AttributeDisplay>
            </dl>
          )}
        </div>
      </Container>
    </header>
  );
});
