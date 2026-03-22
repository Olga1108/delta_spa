export const SectionLoadingState = () => {
  return (
    <div
      aria-label="Loading section"
      className="flex min-h-[min(32rem,70dvh)] w-full flex-col justify-center px-4"
    >
      <div className="mx-auto w-full max-w-[56rem] space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded-xl bg-white/12 md:h-12" />
        <div className="h-6 w-3/4 animate-pulse rounded-xl bg-white/10 md:h-8" />
        <div className="h-28 w-full animate-pulse rounded-xl bg-white/10 md:h-40" />
        <div className="h-28 w-full animate-pulse rounded-xl bg-white/10 md:h-40" />
      </div>
    </div>
  )
}
