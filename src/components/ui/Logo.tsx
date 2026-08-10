import logoBlue from '../../assets/images/logo-blue.png'
import logoWhite from '../../assets/images/logo-white.png'

export default function Logo({
  variant = 'blue',
  className = 'h-7',
}: {
  variant?: 'blue' | 'white'
  className?: string
}) {
  return (
    <img
      src={variant === 'white' ? logoWhite : logoBlue}
      alt="Peer Oreum"
      className={`w-auto ${className}`}
    />
  )
}
