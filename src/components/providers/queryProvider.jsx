'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

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
