import { useDictionary } from "@shared/lib/dictionary";
import { Container } from "@shared/ui/Container";

export function HeroSection() {
  const { translate } = useDictionary();

  return (
    <section
      className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-[var(--color-black)] text-[var(--color-white)]"
      id="hero"
      aria-label="Hero"
    >
      <Container className="text-center">
        <h1 className="font-[var(--font-heading)] text-[clamp(2.5rem,8vw,4rem)] font-bold mb-2 text-[var(--color-yellow)]">
          {translate("hero.title")}
        </h1>
        <p className="text-[clamp(1rem,3vw,1.25rem)] m-0 opacity-90 max-w-[40ch] mx-auto">
          {translate("hero.description")}
        </p>
      </Container>
    </section>
  );
}
