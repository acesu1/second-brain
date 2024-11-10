import { Brain } from 'lucide-react'
import { Separator } from './ui/separator'
import { NavLink } from './nav-link'
import { ThemeSwitcher } from './theme-switcher'
import { Input } from './ui/input'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Brain className="size-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-2 lg:space-x-3">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/uploads">Uploads</NavLink>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Input className="w-auto" placeholder="Search notes..." />

          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
          {/* Account Menu */}
        </div>
      </div>
    </div>
  )
}
