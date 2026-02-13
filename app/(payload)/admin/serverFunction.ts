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

    return response.json()
}
