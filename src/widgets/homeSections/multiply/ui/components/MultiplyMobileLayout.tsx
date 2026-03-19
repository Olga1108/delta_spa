import { benefitCards } from '../constants'

export const MultiplyMobileLayout = () => {
  return (
    <div className="md:hidden">
      <h2 className="font-heading text-4xl font-[500] leading-[0.95] text-white">
        Results can only be <span className="text-[var(--color-yellow)]">guaranteed</span> when
        you control every step
      </h2>
      <p className="mt-4 max-w-[510px] font-heading text-base leading-6 font-[500] text-white">
        That&apos;s why we built a full-time in-house team and custom infrastructure - tailored for
        every task, tested daily in the sweepstakes vertical
      </p>
      <div className="mt-6 space-y-3">
        {benefitCards.map((card) => (
          <p
            key={card.text}
            className="rounded-lg bg-[var(--color-purple-main)] p-4 font-heading text-xl font-[500] leading-6 text-white"
          >
            {card.text}
          </p>
        ))}
      </div>
    </div>
  )
}
