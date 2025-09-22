import WithAuth from '@/components/WithAuth'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <WithAuth>{children}</WithAuth>
}