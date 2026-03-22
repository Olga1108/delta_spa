import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import snakeIcon from '@shared/assets/Images/icons/icon-snake-purple.svg'
import { useDictionary } from '@shared/lib/dictionary'
import { postForm } from '../api/postForm'
import { contactFormSchema } from '../model/schema'
import type { ContactFormPayload, ContactFormValues } from '../model/types'

type ContactFormModalProps = {
  isOpen: boolean
  onClose: () => void
}

const initialFormValues: ContactFormValues = {
  name: '',
  method: 'telegram',
  contact: '',
}

const contactMethodOptions = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
] as const

export const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const { translate } = useDictionary()
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactFormPayload>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialFormValues,
  })

  const closeModal = () => {
    setIsSuccess(false)
    setSubmitError('')
    reset(initialFormValues)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const onSubmit = async (values: ContactFormPayload) => {
    setSubmitError('')
    try {
      await postForm(values)
      setIsSuccess(true)
    } catch {
      setSubmitError('Failed to send form. Please try again.')
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[560px] rounded-[14px] border border-[var(--color-purple-main)] bg-[#ececec] px-5 pt-4 pb-6 text-[var(--color-black)] shadow-[0_18px_48px_rgba(0,0,0,0.35)] md:px-7 md:pt-6 md:pb-8">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-3 font-heading text-[34px] leading-none text-[var(--color-purple-main)]"
          aria-label="Close modal"
        >
          x
        </button>

        <div className="mb-4 flex justify-center md:mb-8">
          <img src={snakeIcon} alt="" className="h-14 w-14 object-contain md:h-16 md:w-16" />
        </div>

        {isSuccess ? (
          <div className="px-1 pb-2 text-center md:px-5">
            <h3 className="font-heading text-[40px] leading-[1.02] font-bold uppercase md:text-[44px]">
              {translate('modal.title')}
            </h3>
            <p className="mt-6 font-body text-[20px] leading-[1.2] md:text-[24px]">
              {translate('modal.text')}
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mx-auto mt-10 block min-w-[130px] rounded-[9px] bg-[#f0dc6b] px-8 py-2.5 font-heading text-[32px] leading-none font-semibold"
            >
              {translate('modal.button.done')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="pb-1">
            <p className="mb-4 font-body text-[16px] leading-[1.25] text-black/75 md:mb-5 md:text-[18px]">
              {translate('form.title')}
            </p>

            <div className="space-y-2.5 md:space-y-3">
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={translate('form.name')}
                  className="h-11 w-full rounded-[9px] border border-[var(--color-purple-main)] bg-transparent px-3.5 font-body text-[16px] leading-none text-black placeholder:text-black/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-purple-main)] md:h-12 md:text-[17px]"
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
                <div>
                  <select
                    {...register('method')}
                    className="h-11 w-full appearance-none rounded-[9px] border border-[var(--color-purple-main)] bg-transparent px-3.5 pr-10 font-body text-[16px] leading-none text-black focus:outline-none focus:ring-1 focus:ring-[var(--color-purple-main)] md:h-12 md:text-[17px]"
                  >
                    {contactMethodOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none relative -top-8 float-right mr-3 text-[13px] text-[var(--color-purple-main)]">
                    ▼
                  </span>
                  {errors.method ? (
                    <p className="mt-1 text-xs text-red-600">{errors.method.message}</p>
                  ) : null}
                </div>

                <div>
                  <input
                    {...register('contact')}
                    type="text"
                    placeholder={translate('form.contact')}
                    className="h-11 w-full rounded-[9px] border border-[var(--color-purple-main)] bg-transparent px-3.5 font-body text-[16px] leading-none text-black placeholder:text-black/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-purple-main)] md:h-12 md:text-[17px]"
                  />
                  {errors.contact ? (
                    <p className="mt-1 text-xs text-red-600">{errors.contact.message}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {submitError ? <p className="mt-3 text-sm text-red-600">{submitError}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto mt-6 block min-w-[130px] rounded-[9px] bg-[#f0dc6b] px-8 py-2.5 font-heading text-[30px] leading-none font-semibold text-black disabled:opacity-70 md:mt-7 md:text-[32px]"
            >
              {translate('form.submit')}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
