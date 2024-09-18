'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function QueryProvider({ children }) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: { retry: false, refetchOnWindowFocus: false }
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
