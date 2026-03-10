export type MultiplyStep = {
  step_1: string
  step_2: string
}

export type MultiplyItem = {
  title: string
  steps: MultiplyStep
}

export type MultiplyData = MultiplyItem[]
