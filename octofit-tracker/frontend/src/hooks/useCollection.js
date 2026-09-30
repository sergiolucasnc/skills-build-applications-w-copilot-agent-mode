import { useEffect, useState } from 'react'

function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return null
}

export function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        const collection = getCollection(payload)
        if (!collection) {
          throw new Error('The server returned an unsupported response.')
        }
        setItems(collection)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadItems()
    return () => controller.abort()
  }, [endpoint])

  return { items, loading, error }
}