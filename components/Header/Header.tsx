 'use client'

import Link from 'next/link'
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation'
import { useAuthStore } from '@/lib/store/authStore'
import css from './Header.module.css'

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li className={css.navigationItem}>
              <Link href="/notes/filter/all" className={css.navigationLink}>
                Notes
              </Link>
            </li>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  )
}
