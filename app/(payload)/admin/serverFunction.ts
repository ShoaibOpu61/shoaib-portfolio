'use client'
import type { ServerFunctionClient } from 'payload'

export const serverFunction: ServerFunctionClient = async (args) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/api/payload/server-functions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    })

    if (!response.ok) {
        throw new Error(`Server function failed: ${response.status} ${response.statusText}`)
    }

    // Check if response has content before parsing
    const text = await response.text()
    if (!text || text.trim() === '') {
        throw new Error('Server function returned empty response')
    }

    return JSON.parse(text)
}
