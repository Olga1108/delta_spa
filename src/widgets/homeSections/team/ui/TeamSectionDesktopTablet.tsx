import type { UiLocale } from '@shared/config/locales'
import { SectionMetaHeading } from '@widgets/homeSections/shared/ui/SectionMetaHeading'
import { SnakeIntroCard } from './components/SnakeIntroCard'
import { TeamTile } from './components/TeamTile'
import type { TeamSectionTile } from '../lib/teamSectionTypes'

type TeamSectionDesktopTabletProps = {
  sideOffsetPx: number
  description: string
  locale: UiLocale
  tiles: TeamSectionTile[]
}

export const TeamSectionDesktopTablet = ({
  sideOffsetPx,
  description,
  locale,
  tiles,
}: TeamSectionDesktopTabletProps) => (
  <div className='flex h-full min-h-0 flex-col'>
    <SectionMetaHeading
      as='h3'
      className='text-right text-[30px] leading-[27px]'
      style={{ marginRight: `${sideOffsetPx}px` }}
    >
      MULTI-TASKS
    </SectionMetaHeading>

    <div className='mt-4 grid flex-1 min-h-0 grid-rows-[minmax(0,1.55fr)_minmax(0,0.8fr)] gap-2 px-6 pb-4 lg:pb-5'>
      <div className='grid grid-cols-2 gap-2'>
        <SnakeIntroCard description={description} locale={locale} variant='tablet' />
        <div className='grid grid-rows-2 gap-2'>
          <TeamTile
            key={`${tiles[0]?.title ?? 'tile-0'}-tablet`}
            title={tiles[0]?.title ?? ''}
            text={tiles[0]?.text ?? ''}
            variant='desktop'
            dataAnim='text'
          />
          <TeamTile
            key={`${tiles[1]?.title ?? 'tile-1'}-tablet`}
            title={tiles[1]?.title ?? ''}
            text={tiles[1]?.text ?? ''}
            variant='desktop'
            dataAnim='text'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <TeamTile
          key={`${tiles[2]?.title ?? 'tile-2'}-tablet-bottom`}
          title={tiles[2]?.title ?? ''}
          text={tiles[2]?.text ?? ''}
          variant='desktop'
          dataAnim='text'
        />
        <TeamTile
          key={`${tiles[3]?.title ?? 'tile-3'}-tablet-bottom`}
          title={tiles[3]?.title ?? ''}
          text={tiles[3]?.text ?? ''}
          variant='desktop'
          dataAnim='text'
        />
        <TeamTile
          key={`${tiles[4]?.title ?? 'tile-4'}-tablet-bottom`}
          title={tiles[4]?.title ?? ''}
          text={tiles[4]?.text ?? ''}
          variant='desktop'
          dataAnim='text'
        />
      </div>
    </div>
  </div>
)
