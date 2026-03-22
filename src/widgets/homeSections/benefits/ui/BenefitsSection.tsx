import type { ReactNode } from 'react'
import { useTasksQuery, type TaskData } from '@entities/task'
import type { UiLocale } from '@shared/config/locales'
import { useDictionary } from '@shared/lib/dictionary'
import heroSnake from '@shared/assets/Images/hero/hero-image-02@1x.png'
import { Container } from '@shared/ui/Container'

const snakeCardDescriptionClassName =
  'max-w-[17ch] font-heading text-[20px] leading-[24px] font-bold tracking-normal text-white md:max-w-[44ch]'

const benefitCardTitleClassName =
  'font-heading text-[28px] leading-[28px] font-bold tracking-normal text-[var(--color-yellow)] uppercase'

const benefitCardTextClassName =
  'mt-2 max-w-[27ch] font-body text-[20px] leading-[24px] font-normal tracking-normal text-white'

/** EN: highlight "in-house team". UA: highlight only "in-house" (word kept in Latin in copy). */
const renderSnakeDescriptionWithHighlight = (description: string, locale: UiLocale): ReactNode => {
  const yellowClass = 'text-[var(--color-yellow)]'
  if (locale === 'en') {
    const parts = description.split(/(in-house team)/gi)
    return parts.map((part, index) =>
      /^in-house team$/i.test(part) ? (
        <span key={index} className={yellowClass}>
          {part}
        </span>
      ) : (
        part
      ),
    )
  }
  const parts = description.split(/(in-house)/gi)
  return parts.map((part, index) =>
    /^in-house$/i.test(part) ? (
      <span key={index} className={yellowClass}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

const fallbackTaskContentByLocale: Record<'en' | 'ua', TaskData> = {
  en: {
    description:
      'We run an in-house team of media buyers, designers, creatives, developers, and copywriters - no middlemen, no outsourcing',
    tiles: [
      {
        title: 'Flexible infrastructure',
        text: 'Custom tools, fast integrations and scalable architecture',
      },
      {
        title: 'High-performing creatives',
        text: 'Scroll-stopping ads tailored to your vertical',
      },
      {
        title: 'Compelling copywriting',
        text: 'Messaging that hooks, sells, and drives funnel growth',
      },
      {
        title: 'Adaptive media buying',
        text: 'No wasted budgets - we test, tweak, and scale',
      },
      {
        title: 'Full-cycle support',
        text: 'From setup to scaling - we support you every step of the way',
      },
    ],
  },
  ua: {
    description:
      "У нас власна in-house команда баєрів, дизайнерів, креаторів, розробників і копірайтерів - без посередників та аутсорсу",
    tiles: [
      {
        title: 'Гнучка інфраструктура',
        text: 'Кастомні рішення, швидкі інтеграції та масштабованість',
      },
      {
        title: 'Конверсійні креативи',
        text: 'Креативи, що зачіпають з першого погляду',
      },
      {
        title: 'Сильний копірайтинг',
        text: 'Тексти, що залучають, продають і рухають воронку',
      },
      {
        title: 'Адаптивний медіабаїнг',
        text: 'Оптимізуємо бюджети в реальному часі - максимум ROI',
      },
      {
        title: 'Підтримка на всіх етапах',
        text: 'Від запуску до масштабування - поруч на кожному кроці',
      },
    ],
  },
}

export const BenefitsSection = () => {
  const { locale } = useDictionary()
  const { data } = useTasksQuery(locale)
  const fallbackContent = fallbackTaskContentByLocale[locale]
  const content = data ?? fallbackContent
  const tiles =
    content.tiles.length >= 5
      ? content.tiles.slice(0, 5)
      : [...content.tiles, ...fallbackContent.tiles].slice(0, 5)

  return (
    <div className="relative w-full md:h-full md:self-stretch bg-[linear-gradient(64.6deg,#9500DC_17.61%,#560080_57.18%,#220032_88.56%)] md:bg-[linear-gradient(111.06deg,#14091A_-3.49%,#14091A_49.69%,#220032_91.86%)]">
      <Container fullWidth className="relative py-7 md:h-full md:py-10">
        {/* No data-anim here: mobile layout is not driven by full-page GSAP. Duplicates broke desktop (first [data-anim=title] was hidden mobile). */}
        <div className="md:hidden">
          <article
            className="overflow-hidden rounded-[10px] bg-[linear-gradient(64.6deg,#9500DC_17.61%,#560080_57.18%,#220032_88.56%)] px-4 pt-5 pb-3 shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
          >
            <p className={snakeCardDescriptionClassName}>
              {renderSnakeDescriptionWithHighlight(content.description, locale)}
            </p>
            <img
              src={heroSnake}
              alt="Purple snake illustration"
              className="pointer-events-none mt-4 h-auto w-full select-none object-contain"
              draggable={false}
            />
          </article>

          <div className="mt-4 space-y-4">
            {tiles.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-[8px] bg-[var(--color-purple-main)] px-3 py-4"
              >
                <h3 className={benefitCardTitleClassName}>{item.title}</h3>
                <p className={benefitCardTextClassName}>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 border-t border-white/25 pt-5">
            <p
              className="text-center font-heading text-[36px] leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase"
            >
              Multi-tasks
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <p
            data-anim="meta"
            className="mb-4 text-right font-heading text-2xl leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase"
          >
            Multi-tasks
          </p>

          <div className="grid h-[calc(100%-2.5rem)] min-h-[34rem] grid-cols-[1.12fr_1.12fr_0.82fr] [grid-template-rows:repeat(6,minmax(0,1fr))] gap-3">
            <article
              data-anim="title"
              className="row-span-6 flex h-full flex-col justify-between rounded-[10px] bg-[linear-gradient(64.6deg,#220032_17.61%,#560080_57.18%,#9500DC_88.56%)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.32)]"
            >
              <p className={snakeCardDescriptionClassName}>
                {renderSnakeDescriptionWithHighlight(content.description, locale)}
              </p>
              <img
                src={heroSnake}
                alt="Purple snake illustration"
                className="pointer-events-none mt-4 h-[25rem] w-full self-center select-none object-contain object-bottom"
                draggable={false}
              />
            </article>

            <div className="row-span-6 grid h-full grid-rows-2 gap-3">
              {tiles.slice(0, 2).map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  data-anim="text"
                  className="h-full rounded-[10px] bg-[var(--color-purple-main)] p-5"
                >
                  <h3 className={benefitCardTitleClassName}>{item.title}</h3>
                  <p className={benefitCardTextClassName}>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="row-span-6 grid h-full grid-rows-3 gap-3">
              {tiles.slice(2, 5).map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  data-anim="text"
                  className="h-full rounded-[10px] bg-[var(--color-purple-main)] p-5"
                >
                  <h3 className={benefitCardTitleClassName}>{item.title}</h3>
                  <p className={benefitCardTextClassName}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
