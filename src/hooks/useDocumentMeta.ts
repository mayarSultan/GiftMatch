import { useEffect } from 'react'

const SITE_NAME = 'GiftMatch'

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`

    if (!description) return

    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', description)
  }, [title, description])
}
