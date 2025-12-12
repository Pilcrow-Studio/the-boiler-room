import ResolvedLink from '../utils/ResolvedLink'
import {Suspense, ButtonHTMLAttributes} from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-gray-800 focus-visible:ring-black',
        secondary: 'bg-gray-100 text-black hover:bg-gray-200 focus-visible:ring-gray-500',
        outline:
          'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500',
        ghost: 'hover:bg-gray-100 focus-visible:ring-gray-500',
        link: 'underline-offset-4 hover:underline text-black',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  link?: any
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  asChild?: boolean
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  fullWidth?: ButtonVariants['fullWidth']
}

export default function MainButton({
  children,
  link,
  variant,
  size,
  fullWidth,
  loading,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  type = 'button',
  ...props
}: MainButtonProps) {
  const classes = buttonVariants({variant, size, fullWidth, className})

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  )

  // If link is provided, render as a link
  if (link) {
    return (
      <Suspense fallback={null}>
        <ResolvedLink link={link} className={classes}>
          {content}
        </ResolvedLink>
      </Suspense>
    )
  }

  // Otherwise render as a button
  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}