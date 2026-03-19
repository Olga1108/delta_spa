import { ParallelogramButton } from '@shared/ui/ParallelogramButton'
import { audienceButtons } from '../constants'
import { LineArrow } from './LineArrow'

export const JoinMobileLayout = () => {
  return (
    <div className="space-y-6 md:hidden">
      <div className="space-y-3">
        {audienceButtons.map((item, index) => {
          const isHighlighted = index === 0

          return (
            <button
              key={item.label}
              type="button"
              className="flex h-16 w-full items-center justify-between rounded-full border-2 px-8 font-heading text-[24px] leading-6"
              style={{
                borderColor: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
                backgroundColor: isHighlighted ? 'var(--color-yellow)' : 'transparent',
                color: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
              }}
            >
              <span className="font-[500]">{item.label}</span>
              <LineArrow
                width={40}
                color={isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)'}
                strokeWidth={2.8}
              />
            </button>
          )
        })}
      </div>

      <div className="rounded-xl bg-[linear-gradient(133.8deg,#a30ee9_5.95%,#8a00cc_98.41%)] p-5 text-center text-white">
        <div className="mx-auto max-w-[560px] space-y-4">
          <p className="font-heading text-xl leading-6 font-[500]">
            Got experience with sweepstakes and large ad budgets? Looking for a team where you can
            grow and scale without limits?
          </p>
          <div className="flex justify-center">
            <LineArrow
              width={30}
              color="var(--color-black)"
              strokeWidth={2.4}
              className="rotate-90"
            />
          </div>
          <p className="font-heading text-xl leading-6 font-[500]">
            Multiply your profits with MULTICPA — we provide the budget, all the tools and high
            profit shares
          </p>
          <div className="flex justify-center">
            <LineArrow
              width={30}
              color="var(--color-black)"
              strokeWidth={2.4}
              className="rotate-90"
            />
          </div>

          <ParallelogramButton
            className="mt-1 max-w-full text-[20px] font-[500] tracking-[4px] text-[var(--color-black)]"
            width={330}
            height={82}
            faceHeight={72}
            sideWidth={10}
          >
            JOIN THE TEAM
          </ParallelogramButton>
        </div>
      </div>
    </div>
  )
}
