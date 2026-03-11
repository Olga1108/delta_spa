import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getTasks } from "@entities/task";
import { getLocaleFromPathname } from "@shared/config/locales";
import { Container } from "@shared/ui/Container";

export function TasksSection() {
  const { pathname } = useLocation();
  const locale = getLocaleFromPathname(pathname);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tasks", locale],
    queryFn: () => getTasks(locale),
  });

  return (
    <section
      className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-[var(--color-purple-darker)] text-[var(--color-white)]"
      id="tasks"
      aria-labelledby="tasks-heading"
    >
      <Container className="py-8">
        {isPending && <p className="m-0 text-base opacity-90">Loading…</p>}
        {isError && (
          <p className="m-0 text-base opacity-90" role="alert">
            {error instanceof Error ? error.message : "Failed to load tasks"}
          </p>
        )}
        {data && (
          <>
            <h2
              id="tasks-heading"
              className="font-[var(--font-heading)] text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-6 text-[var(--color-yellow)]"
            >
              {data.description}
            </h2>
            {data.tiles?.length > 0 && (
              <ul className="list-none m-0 p-0 flex flex-col gap-6">
                {data.tiles.map((tile, index) => (
                  <li
                    key={index}
                    className="p-4 rounded-lg bg-white/[0.06]"
                  >
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold mb-2 text-[var(--color-yellow)] m-0">
                      {tile.title}
                    </h3>
                    <p className="text-base leading-normal m-0 opacity-95">
                      {tile.text}
                    </p>
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
