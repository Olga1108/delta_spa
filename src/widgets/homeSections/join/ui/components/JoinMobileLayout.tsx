import logoMain from '@shared/assets/Images/icons/logo-main.svg'
import type { MultiplySectionContent } from '@entities/multiply'
import { useDictionary } from '@shared/lib/dictionary'
import { useMobileHomeMenu } from '@shared/lib/useMobileHomeMenu'
import { ParallelogramButton } from '@shared/ui/ParallelogramButton'
import { LineArrow } from './LineArrow'

type JoinMobileLayoutProps = {
  items: MultiplySectionContent[]
  activeAudience: number
  setActiveAudience: (index: number) => void
  getAudienceLabel: (key: MultiplySectionContent['key']) => string
  getCtaLabel: (key: MultiplySectionContent['key']) => string
}

export const JoinMobileLayout = ({
  items,
  activeAudience,
  setActiveAudience,
  getAudienceLabel,
  getCtaLabel,
}: JoinMobileLayoutProps) => {
  const currentItem = items[activeAudience] ?? items[0]
  const { translate } = useDictionary()
  const mobileMenu = useMobileHomeMenu()

  return (
    <div className='md:hidden'>
      <div className='flex items-start justify-between'>
        <img src={logoMain} alt='CPA logo' className='h-auto w-[26px]' />
        <button
          type='button'
          onClick={() => mobileMenu?.open()}
          className='font-heading text-base font-[700] text-[var(--color-yellow)] uppercase underline underline-offset-4'
        >
          {translate('header.menu.open')}
        </button>
      </div>

      <div className='mt-10 space-y-5'>
        {items.map((item, index) => {
          const isHighlighted = index === activeAudience

          return (
            <button
              key={item.key}
              type='button'
              onClick={() => setActiveAudience(index)}
              className='flex h-16 w-full cursor-pointer items-center justify-between rounded-full border-2 px-8 font-heading text-[24px] leading-6'
              style={{
                borderColor: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
                backgroundColor: isHighlighted ? 'var(--color-yellow)' : 'transparent',
                color: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
              }}
            >
              <span className='font-[500]'>{getAudienceLabel(item.key)}</span>
              <LineArrow
                width={40}
                color={isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)'}
                strokeWidth={2.8}
              />
            </button>
          )
        })}
      </div>

      <div className='mt-8 rounded-xl bg-[linear-gradient(133.8deg,#a30ee9_5.95%,#8a00cc_98.41%)] p-5 text-center text-white'>
        <div className='mx-auto max-w-[560px] space-y-4'>
          <p className='font-heading text-xl leading-6 font-[500]'>{currentItem.step1}</p>
          <div className='flex justify-center'>
            <LineArrow
              width={30}
              color='var(--color-black)'
              strokeWidth={2.4}
              className='rotate-90'
            />
          </div>
          <p className='font-heading text-xl leading-6 font-[500]'>{currentItem.step2}</p>
          <div className='flex justify-center'>
            <LineArrow
              width={30}
              color='var(--color-black)'
              strokeWidth={2.4}
              className='rotate-90'
            />
          </div>

          <ParallelogramButton
            className='mt-1 max-w-full text-[20px] font-[500] tracking-[4px] text-[var(--color-black)]'
            width={330}
            height={82}
            faceHeight={72}
            sideWidth={10}
          >
            {getCtaLabel(currentItem.key)}
          </ParallelogramButton>
        </div>
      </div>

      <p className='mt-7 text-center font-heading text-[20px] font-[700] leading-none tracking-tight text-[var(--color-yellow)] uppercase'>
        MULTIPLY WITH US
      </p>
    </div>
  )
}
