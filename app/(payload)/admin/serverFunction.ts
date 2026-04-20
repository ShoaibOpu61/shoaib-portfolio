'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'
import { handleServerFunctions } from '@payloadcms/next/layouts'

import config from '@/payload.config'
import { importMap } from './importMap'

export const serverFunction: ServerFunctionClient = async (
  args: ServerFunctionClientArgs,
) => {
  try {
    return await handleServerFunctions({
      config,
      importMap,
      name: args.name,
      args: args.args,
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
