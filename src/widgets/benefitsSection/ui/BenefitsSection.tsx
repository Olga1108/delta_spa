import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getBenefits } from "@entities/benefit";
import { getLocaleFromPathname } from "@shared/config/locales";
import { Container } from "@shared/ui/Container";

export function BenefitsSection() {
  const { pathname } = useLocation();
  const locale = getLocaleFromPathname(pathname);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["benefits", locale],
    queryFn: () => getBenefits(locale),
  });

  return (
    <section
      className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-[var(--color-purple-darker)] text-[var(--color-white)]"
      id="benefits"
      aria-labelledby="benefits-heading"
    >
      <Container className="py-8">
        {isPending && <p className="m-0 text-base opacity-90">Loading…</p>}
        {isError && (
          <p className="m-0 text-base opacity-90" role="alert">
            {error instanceof Error ? error.message : "Failed to load benefits"}
          </p>
        )}
        {data && (
          <>
            <h2
              id="benefits-heading"
              className="font-[var(--font-heading)] text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-4 text-[var(--color-yellow)]"
            >
              {data.title}
            </h2>
            {data.description && (
              <p className="text-base leading-normal mb-6 opacity-95">
                {data.description}
              </p>
            )}
            {data.benefits?.length > 0 && (
              <ul className="list-none m-0 p-0 flex flex-col gap-3">
                {data.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="pl-5 relative leading-normal before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-1.5 before:h-1.5 before:bg-[var(--color-yellow)] before:rounded-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
