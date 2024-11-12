import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import type { ReactNode } from 'react'

export function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick,
  variant,
}:{
  isLoading: boolean,
  children: ReactNode,
  loadingText: string,
  onClick?: () => void,
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  | 'link' | null | undefined

}) {
  return (
    <Button
      variant={variant}
      type="submit"
      onClick={onClick}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading
        ? loadingText
        : children}
    </Button>
  )
}
