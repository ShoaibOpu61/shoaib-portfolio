'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'
import { renderDocumentHandlerOverride } from './renderDocumentHandler'

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
      config,
      importMap,
      name: args.name,
      args: args.args,
      serverFunctions: {
        'render-document': renderDocumentHandlerOverride,
      },
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
