import type { CreateRunBody, CreateRunResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function createRun(body: CreateRunBody) {
	return api.post("runs", { json: body }).json<CreateRunResponse>();
}
