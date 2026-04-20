'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'
import { handleServerFunctions } from '@payloadcms/next/layouts'

import config from '@/payload.config'
import { importMap } from './importMap'

export const serverFunction: ServerFunctionClient = async (
  args: ServerFunctionClientArgs,
) => {
  return handleServerFunctions({
    config,
    importMap,
    name: args.name,
    args: args.args,
  })
}
