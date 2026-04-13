import { handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@/payload.config";
import { importMap } from "../../../admin/importMap";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleServerFunctions({
      config,
      importMap,
      name: body.name,
      args: body.args,
    });

    return Response.json(result);
  } catch (error) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 500;

    const message =
      error instanceof Error ? error.message : "Payload server function failed";

    return Response.json({ message }, { status });
  }
}
