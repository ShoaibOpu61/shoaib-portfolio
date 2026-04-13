import type { ImportMap } from 'payload'
import { importMap as generatedImportMap } from './importMap.js'

// Re-export Payload's generated admin import map so built-in client components
// like the Vercel Blob upload handler are available inside drawers/modals.
export const importMap: ImportMap = generatedImportMap
