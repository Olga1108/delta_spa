import snakeIconYellow from '@shared/assets/Images/icons/icon-snake-yellow.svg'

export const MultiplyMarqueeContent = () => {
  return (
    <div className="flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 uppercase">
      <span>Dream big earn bigger!</span>
      <img src={snakeIconYellow} alt="" className="h-7 w-7 shrink-0 md:h-10 md:w-10" />
      <span>Dream big earn bigger!</span>
      <img src={snakeIconYellow} alt="" className="h-7 w-7 shrink-0 md:h-10 md:w-10" />
      <span>Dream big earn bigger!</span>
      <img src={snakeIconYellow} alt="" className="h-7 w-7 shrink-0 md:h-10 md:w-10" />
    </div>
  )
}
