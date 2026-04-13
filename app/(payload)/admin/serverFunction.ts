'use client'
import type { ServerFunctionClient } from 'payload'

export const serverFunction: ServerFunctionClient = async (args) => {
    const response = await fetch("/api/payload/server-functions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    })

    if (!response.ok) {
        throw new Error(`Payload server function request failed: ${response.status}`)
    }

    return response.json()
}
