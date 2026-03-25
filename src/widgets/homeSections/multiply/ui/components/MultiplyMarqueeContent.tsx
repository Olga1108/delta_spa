import snakeIconYellow from '@shared/assets/Images/icons/icon-snake-yellow.svg'

type MultiplyMarqueeContentProps = {
  mobile?: boolean
}

export const MultiplyMarqueeContent = ({ mobile = false }: MultiplyMarqueeContentProps) => {
  return (
    <div
      className={`flex shrink-0 items-center whitespace-nowrap uppercase ${mobile ? 'gap-[25px] pr-[25px]' : 'gap-6 pr-6'}`}
    >
      <span>Dream big earn bigger!</span>
      <img
        src={snakeIconYellow}
        alt=''
        className={`shrink-0 ${mobile ? 'h-[27px] w-[30px]' : 'h-7 w-7 md:h-10 md:w-10'}`}
      />
      <span>Dream big earn bigger!</span>
      <img
        src={snakeIconYellow}
        alt=''
        className={`shrink-0 ${mobile ? 'h-[27px] w-[30px]' : 'h-7 w-7 md:h-10 md:w-10'}`}
      />
      <span>Dream big earn bigger!</span>
      <img
        src={snakeIconYellow}
        alt=''
        className={`shrink-0 ${mobile ? 'h-[27px] w-[30px]' : 'h-7 w-7 md:h-10 md:w-10'}`}
      />
    </div>
  )
}
