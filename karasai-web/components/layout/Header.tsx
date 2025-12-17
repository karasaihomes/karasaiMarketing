'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, User, Heart, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const navigation = [
    { name: 'SEARCH', href: '/search' },
    { name: 'ABOUT', href: '/about' },
    { name: 'HOME', href: '/' },
  ]

  // Check authentication state
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserMenuOpen(false)
  }

  // Get user display name (email prefix or full name if available)
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-gray bg-white shadow-sm">
      <nav className="container-custom" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/logo.png"
                alt="Karasai"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {/* Nav Links */}
            <div className="flex gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-wider text-karasai-blue transition-colors hover:text-karasai-blue/80"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            {!isLoading && (
              <>
                {user ? (
                  /* User Menu Dropdown */
                  <div className="relative" ref={userMenuRef}>
                    <button
                      type="button"
                      className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-karasai-blue transition-colors hover:bg-karasai-light"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <User className="h-4 w-4" />
                      <span className="max-w-[100px] truncate">{getUserDisplayName()}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-x-3 px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-gray"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4" />
                            Saved Homes
                          </Link>
                          <Link
                            href="/account"
                            className="flex items-center gap-x-3 px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-gray"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Account Settings
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-x-3 px-4 py-2 text-left text-sm text-neutral-dark hover:bg-neutral-gray"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sign In Button */
                  <Link
                    href="/login"
                    className="rounded-md bg-karasai-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-karasai-blue/90"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-2 border-t border-neutral-gray py-6">
              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium uppercase tracking-wider text-karasai-blue hover:bg-neutral-gray"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {!isLoading && (
                <>
                  {user ? (
                    <>
                      <div className="border-t border-neutral-gray pt-4">
                        <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-dark/60">
                          Account
                        </div>
                        <Link
                          href="/dashboard"
                          className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-medium text-karasai-blue hover:bg-neutral-gray"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Heart className="h-5 w-5" />
                          Saved Homes
                        </Link>
                        <Link
                          href="/account"
                          className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-medium text-karasai-blue hover:bg-neutral-gray"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="h-5 w-5" />
                          Account Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut()
                            setMobileMenuOpen(false)
                          }}
                          className="-mx-3 flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-left text-base font-medium text-karasai-blue hover:bg-neutral-gray"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t border-neutral-gray pt-4">
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg bg-karasai-blue px-3 py-2 text-center text-base font-semibold text-white hover:bg-karasai-blue/90"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}