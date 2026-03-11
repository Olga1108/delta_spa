import { HeroSection } from "@widgets/heroSection";
import { TasksSection } from "@widgets/tasksSection";

export function HomePage() {
  return (
    <main className="min-h-full">
      <HeroSection />
      <TasksSection />
    </main>
  );
}
