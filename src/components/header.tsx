import { Brain } from 'lucide-react'
import { Separator } from './ui/separator'
import { NavLink } from './nav-link'
import { ThemeSwitcher } from './theme-switcher'

import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated } from 'convex/react'
// import { SearchNoteInput } from './header/search-note-input'

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
          {/* <SearchNoteInput />

          <Separator orientation="vertical" className="h-6" /> */}

          <ThemeSwitcher />
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </div>
  )
}
