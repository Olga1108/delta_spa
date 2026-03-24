import { useNavigate } from 'react-router-dom'
import logoMain from '@shared/assets/Images/icons/logo-main.svg'
import heroSnakeImage from '@shared/assets/Images/hero/hero-image-main@1x.png'
import { ParallelogramButton } from '@shared/ui/ParallelogramButton'

export const DesktopNotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <main className='relative min-h-dvh overflow-hidden bg-[linear-gradient(122deg,#dc8400_2%,#560080_50%,#220032_92%)] text-white'>
      <img
        src={logoMain}
        alt='CPA logo'
        className='absolute top-[30px] left-[50px] z-20 h-auto w-[44px]'
      />

      <div className='relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 pt-28 pb-16 text-center'>
        <h1 className='font-heading text-[15rem] leading-[0.85] font-[700] tracking-[-0.04em] uppercase xl:text-[23.68rem]'>
          404
        </h1>

        <ParallelogramButton
          onClick={() => navigate('/')}
          width={420}
          className='mt-10 text-[23px] font-[700] tracking-[0.2em] text-[var(--color-black)]'
          aria-label='Go back to home page'
        >
          Oops, take me back
        </ParallelogramButton>
      </div>

      <img
        src={heroSnakeImage}
        alt=''
        aria-hidden='true'
        className='pointer-events-none absolute bottom-0 left-[0.5rem] z-0 w-[30rem] max-w-none select-none xl:w-[34rem]'
      />
    </main>
  )
}
