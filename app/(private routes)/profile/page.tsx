import type { Metadata } from 'next'
import ProfilePageClient from './ProfilePage.client'

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'View your NoteHub profile details.',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'View your NoteHub profile details.',
    url: '/profile',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
}

export default async function ProfilePage() {
  return <ProfilePageClient />
}
