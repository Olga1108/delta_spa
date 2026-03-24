import type { CSSProperties, ReactNode } from 'react'

type SectionMetaHeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type SectionMetaHeadingProps = {
  children: ReactNode
  as?: SectionMetaHeadingTag
  className?: string
  style?: CSSProperties
  dataAnim?: string
}

const baseClassName =
  'font-heading leading-none font-[500] tracking-[-1.7422px] text-[var(--color-yellow)] uppercase'

export const SectionMetaHeading = ({
  children,
  as = 'h3',
  className,
  style,
  dataAnim,
}: SectionMetaHeadingProps) => {
  const HeadingTag = as

  return (
    <HeadingTag
      data-anim={dataAnim ?? 'meta'}
      className={className ? `${baseClassName} ${className}` : baseClassName}
      style={style}
    >
      {children}
    </HeadingTag>
  )
}
