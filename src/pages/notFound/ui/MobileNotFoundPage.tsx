import { useNavigate } from 'react-router-dom'
import logoMain from '@shared/assets/Images/icons/logo-main.svg'
import heroSnakeImage from '@shared/assets/Images/hero/hero-image-main@1x.png'
import { ParallelogramButton } from '@shared/ui/ParallelogramButton'

export const MobileNotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <main className='relative min-h-dvh overflow-hidden bg-[linear-gradient(105deg,#9500dc_3%,#560080_56%,#220032_103%)] text-white'>
      <img
        src={logoMain}
        alt='CPA logo'
        className='absolute top-[10px] left-4 z-20 h-auto w-[26px]'
      />

      <button
        type='button'
        className='absolute top-[20px] right-4 z-20 font-heading text-base font-[700] text-[var(--color-yellow)] uppercase underline underline-offset-4'
      >
        Menu
      </button>

      <div className='relative z-10 flex min-h-dvh flex-col items-center px-4 pt-[96px] pb-16 text-center'>
        <div className='font-heading text-[11.25rem] leading-[0.82] font-[700] tracking-[-0.04em] uppercase'>
          <p>4</p>
          <p>0</p>
          <p>4</p>
        </div>

        <ParallelogramButton
          onClick={() => navigate('/')}
          width={251}
          height={60}
          className='mt-8 text-[18px] font-[700] tracking-[0.2em] text-[var(--color-black)]'
          aria-label='Go back to home page'
        >
          Take me back
        </ParallelogramButton>
      </div>

      <img
        src={heroSnakeImage}
        alt=''
        aria-hidden='true'
        className='pointer-events-none absolute right-[-3.5rem] bottom-[-0.75rem] z-0 w-[20rem] max-w-none select-none'
      />
    </main>
  )
}
