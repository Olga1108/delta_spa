import type { UiLocale } from '@shared/config/locales'
import { SectionMetaHeading } from '@widgets/homeSections/shared/ui/SectionMetaHeading'
import { SnakeIntroCard } from './components/SnakeIntroCard'
import { TeamTile } from './components/TeamTile'
import type { TeamSectionTile } from '../lib/teamSectionTypes'

type TeamSectionDesktopWideProps = {
  sideOffsetPx: number
  bottomOffsetPx: number
  headingToGridGapPx: number
  description: string
  locale: UiLocale
  tiles: TeamSectionTile[]
}

const META_TOP_PX = 20
const META_LINE_HEIGHT_PX = 27

export const TeamSectionDesktopWide = ({
  sideOffsetPx,
  bottomOffsetPx,
  headingToGridGapPx,
  description,
  locale,
  tiles,
}: TeamSectionDesktopWideProps) => (
  <>
    <SectionMetaHeading
      as='h3'
      className='absolute text-right text-[30px] leading-[27px]'
      style={{
        top: `${META_TOP_PX}px`,
        right: `${sideOffsetPx}px`,
      }}
    >
      MULTI-TASKS
    </SectionMetaHeading>

    <div
      className='absolute'
      style={{
        top: `${META_TOP_PX + META_LINE_HEIGHT_PX + headingToGridGapPx}px`,
        left: `${sideOffsetPx}px`,
        right: `${sideOffsetPx}px`,
        bottom: `${bottomOffsetPx}px`,
      }}
    >
      <div className='grid h-full grid-cols-[1.12fr_1.12fr_1.12fr] [grid-template-rows:repeat(6,minmax(0,1fr))] gap-2'>
        <SnakeIntroCard description={description} locale={locale} variant='desktop' />

        <div className='row-span-6 grid h-full grid-rows-2 gap-2'>
          {tiles.slice(0, 2).map((item, index) => (
            <TeamTile
              key={`${item.title}-${index}`}
              title={item.title}
              text={item.text}
              variant='desktop'
              dataAnim='text'
            />
          ))}
        </div>

        <div className='row-span-6 grid h-full grid-rows-3 gap-2'>
          {tiles.slice(2, 5).map((item, index) => (
            <TeamTile
              key={`${item.title}-${index}`}
              title={item.title}
              text={item.text}
              variant='desktop'
              dataAnim='text'
            />
          ))}
        </div>
      </div>
    </div>
  </>
)
