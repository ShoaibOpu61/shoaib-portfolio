'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'

export const serverFunction: ServerFunctionClient = async (
  args: ServerFunctionClientArgs,
) => {
  try {
    const [{ handleServerFunctions }, { default: config }, { importMap }] =
      await Promise.all([
        import('@payloadcms/next/layouts'),
        import('@/payload.config'),
        import('./importMap'),
      ])

    return await handleServerFunctions({
        ...args,
      config,
      importMap,
    })
  } catch (error) {
    console.error('Payload server function failed', {
      name: args.name,
      args: args.args,
      error,
    })

    throw error
  }
}
