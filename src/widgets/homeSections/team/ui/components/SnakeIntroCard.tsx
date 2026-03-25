import type { UiLocale } from '@shared/config/locales'
import heroSnake from '@shared/assets/Images/hero/hero-image-02@1x.png'
import { renderWordsWithHighlight } from '../../lib/snakeDescriptionHighlight'

const snakeCardDescriptionClassName =
  'max-w-[17ch] font-heading text-[20px] leading-[24px] font-bold tracking-normal text-white md:max-w-[44ch]'

type SnakeIntroCardProps = {
  description: string
  locale: UiLocale
  variant: 'mobile' | 'tablet' | 'desktop'
}

export const SnakeIntroCard = ({ description, locale, variant }: SnakeIntroCardProps) => {
  if (variant === 'mobile') {
    return (
      <article className='overflow-hidden rounded-[10px] bg-[linear-gradient(64.6deg,#220032_17.61%,#560080_57.18%,#9500DC_88.56%)] px-4 pt-5 pb-3]'>
        <p className={snakeCardDescriptionClassName}>
          {renderWordsWithHighlight(description, locale)}
        </p>
        <img
          src={heroSnake}
          alt='Purple snake illustration'
          className='pointer-events-none mt-4 h-auto w-full select-none object-contain'
          draggable={false}
        />
      </article>
    )
  }

  if (variant === 'tablet') {
    return (
      <article
        data-anim='title'
        className='flex h-full flex-col justify-between overflow-hidden rounded-[10px] bg-[linear-gradient(64.6deg,#220032_17.61%,#560080_57.18%,#9500DC_88.56%)] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.32)]'
      >
        <p className='max-w-[42ch] font-heading text-[15px] leading-[19px] font-bold tracking-normal text-white'>
          {renderWordsWithHighlight(description, locale)}
        </p>
        <img
          src={heroSnake}
          alt='Purple snake illustration'
          className='pointer-events-none mt-2 h-[15.5rem] w-full self-center select-none object-contain object-bottom'
          draggable={false}
        />
      </article>
    )
  }

  return (
    <article
      data-anim='title'
      className='row-span-6 flex h-full flex-col justify-between rounded-[10px] bg-[linear-gradient(64.6deg,#220032_17.61%,#560080_57.18%,#9500DC_88.56%)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.32)]'
    >
      <p className={snakeCardDescriptionClassName}>
        {renderWordsWithHighlight(description, locale)}
      </p>
      <img
        src={heroSnake}
        alt='Purple snake illustration'
        className='pointer-events-none mt-4 h-[25rem] w-full self-center select-none object-contain object-bottom'
        draggable={false}
      />
    </article>
  )
}
