'use client'

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface Article {
  title: string
  slug: string
  excerpt?: string
}

interface ShareButtonsProps {
  article: Article
  variant?: 'icon' | 'buttons'
}

export default function ShareButtons({ article, variant = 'icon' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `https://karasai.com/articles/${article.slug}`
  const shareText = article.title

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  }

  if (variant === 'buttons') {
    return (
      <div className="flex flex-wrap gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border-2 border-neutral-gray bg-white px-4 py-2 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light"
        >
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border-2 border-neutral-gray bg-white px-4 py-2 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light"
        >
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">Twitter</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border-2 border-neutral-gray bg-white px-4 py-2 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-lg border-2 border-karasai-blue bg-karasai-blue px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-opacity-90"
        >
          <LinkIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Share2 className="h-5 w-5 text-neutral-dark/60" />
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2 transition-colors hover:bg-neutral-gray"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4 text-neutral-dark/70" />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2 transition-colors hover:bg-neutral-gray"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4 text-neutral-dark/70" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2 transition-colors hover:bg-neutral-gray"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4 text-neutral-dark/70" />
      </a>
      <button
        onClick={handleCopyLink}
        className="rounded-full p-2 transition-colors hover:bg-neutral-gray"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        <LinkIcon className={`h-4 w-4 ${copied ? 'text-status-available' : 'text-neutral-dark/70'}`} />
      </button>
    </div>
  )
}