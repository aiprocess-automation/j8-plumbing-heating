import {
  Wrench,
  Flame,
  Droplets,
  Thermometer,
  Gauge,
  Zap,
  Award,
  ShieldCheck,
  MapPin,
  Heart,
  Phone,
  Mail,
  Clock,
  Star,
  AlertCircle,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Flame,
  Droplets,
  Thermometer,
  Gauge,
  Zap,
  Award,
  ShieldCheck,
  MapPin,
  Heart,
  Phone,
  Mail,
  Clock,
  Star,
  AlertCircle,
  Settings,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Settings
}
