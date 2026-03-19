import type { MultiplyData, MultiplyItem, MultiplySectionContent } from './types'

type AudienceMeta = Pick<MultiplySectionContent, 'key' | 'buttonWidth'>

const audienceMetaByTitle: Record<string, AudienceMeta> = {
  for_media_buyers: {
    key: 'media_buyers',
    buttonWidth: 484,
  },
  for_businesses: {
    key: 'businesses',
    buttonWidth: 451,
  },
  for_partners: {
    key: 'partners',
    buttonWidth: 406,
  },
  'Медіабайерам': {
    key: 'media_buyers',
    buttonWidth: 484,
  },
  'Бізнесу': {
    key: 'businesses',
    buttonWidth: 451,
  },
  'Партнерам': {
    key: 'partners',
    buttonWidth: 406,
  },
}

const fallbackAudienceMeta: AudienceMeta[] = [
  {
    key: 'media_buyers',
    buttonWidth: 484,
  },
  {
    key: 'businesses',
    buttonWidth: 451,
  },
  {
    key: 'partners',
    buttonWidth: 406,
  },
]

const mapMultiplyItem = (item: MultiplyItem, index: number): MultiplySectionContent => {
  const meta = audienceMetaByTitle[item.title] ?? fallbackAudienceMeta[index] ?? fallbackAudienceMeta[0]

  return {
    ...meta,
    step1: item.steps.step_1,
    step2: item.steps.step_2,
  }
}

export const mapMultiplyData = (data: MultiplyData): MultiplySectionContent[] => {
  return data.map(mapMultiplyItem)
}
