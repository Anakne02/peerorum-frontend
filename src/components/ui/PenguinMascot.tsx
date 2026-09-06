import PenguinHero from './PenguinHero'

export default function PenguinMascot({ className = 'h-24 w-24' }: { className?: string }) {
  return <PenguinHero className={className} />
}
