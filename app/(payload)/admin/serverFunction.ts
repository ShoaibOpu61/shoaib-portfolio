'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'

const normalizeServerFunctionArgs = (args: ServerFunctionClientArgs) => {
  if (args.name !== 'render-document' || !args.args) {
    return args.args
  }

  const renderDocumentArgs = args.args as Record<string, unknown>

  if (
    renderDocumentArgs.docID == null &&
    !renderDocumentArgs.paramsOverride &&
    typeof renderDocumentArgs.collectionSlug === 'string'
  ) {
    return {
      ...renderDocumentArgs,
      paramsOverride: {
        segments: ['collections', renderDocumentArgs.collectionSlug, 'create'],
      },
    }
  }

  return renderDocumentArgs
}

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
      args: normalizeServerFunctionArgs(args),
    })
  } catch (error) {
    console.error('Payload server function failed', {
      name: args.name,
      args: normalizeServerFunctionArgs(args),
      error,
    })

    throw error
  }
}
