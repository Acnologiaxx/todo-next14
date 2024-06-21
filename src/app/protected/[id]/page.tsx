'use client'

import useSupabaseBrowser from '@/utils/supabase-browser'
import { getNotes } from '@/queries/get-notes-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { UUID } from 'crypto'

export default function Notes({ id }: { id: UUID }) {
  const supabase = useSupabaseBrowser()
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data: notes } = useQuery(getNotes(id))

  return (
    <div>
      <h1>SSR: {notes?.title}</h1>
    </div>
  )
}