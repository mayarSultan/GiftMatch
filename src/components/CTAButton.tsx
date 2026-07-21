import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface CTAButtonBaseProps {
  label: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
}

interface CTAButtonAsLink extends CTAButtonBaseProps {
  to: string
  onClick?: never
}

interface CTAButtonAsButton extends CTAButtonBaseProps {
  to?: undefined
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

type CTAButtonProps = CTAButtonAsLink | CTAButtonAsButton

export function CTAButton({
  label,
  variant,
  size,
  className,
  to,
  ...props
}: CTAButtonProps) {
  const content = (
    <>
      {label}
      <ArrowRight
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cn('group', buttonVariants({ variant, size }), className)}>
        {content}
      </Link>
    )
  }

  return (
    <Button variant={variant} size={size} className={cn('group', className)} {...props}>
      {content}
    </Button>
  )
}
