'use server'

import type { ServerFunction } from 'payload'

type RenderDocumentArgs = Record<string, unknown> & {
  collectionSlug?: string
  docID?: number | string | null
  drawerSlug?: string
  paramsOverride?: unknown
}

export const renderDocumentHandlerOverride: ServerFunction<
  RenderDocumentArgs
> = async (args) => {
  const { renderDocumentHandler } = await import(
    '@payloadcms/next/dist/views/Document/handleServerFunction.js'
  )

  if (
    args.collectionSlug === 'media' &&
    args.docID == null &&
    args.drawerSlug &&
    !args.paramsOverride
  ) {
    return renderDocumentHandler({
      ...args,
      paramsOverride: {
        segments: ['collections', 'media', 'create'],
      },
    })
  }

  return renderDocumentHandler(args)
}
