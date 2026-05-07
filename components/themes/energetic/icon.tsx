import * as Lucide from 'lucide-react'

type LucideExport = typeof Lucide
type IconNames = keyof LucideExport

/**
 * Render a lucide-react icon by string name. Returns null if the name
 * doesn't resolve to a valid component. Used by the AI-generated
 * site.json which carries icon names as plain strings.
 */
export function Icon({
  name,
  className,
  size = 24,
}: {
  name: string
  className?: string
  size?: number
}) {
  const Component = (Lucide as Record<string, unknown>)[name]
  if (typeof Component !== 'function' && typeof Component !== 'object') return null
  const Comp = Component as React.ComponentType<{
    className?: string
    size?: number
  }>
  return <Comp className={className} size={size} />
}
