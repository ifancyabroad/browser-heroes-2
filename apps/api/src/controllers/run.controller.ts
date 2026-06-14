import type { Request, Response } from "express";
import type {
	ApiErrorResponse,
	CreateRunBody,
	CreateRunResponse,
	CurrentRunResponse,
	GetRunResponse,
} from "@app/shared";
import { createRun, getCurrentRunForUser, getRunForUser } from "../services/run.service";
import { toRunView } from "../services/projection.service";

export async function createRunController(
	req: Request<never, CreateRunResponse, CreateRunBody>,
	res: Response<CreateRunResponse>,
) {
	const run = await createRun({
		userId: req.session.userId!,
		body: req.body,
	});

	res.status(201).json({
		run: toRunView(run),
	});
}

export async function getCurrentRunController(req: Request, res: Response<CurrentRunResponse>) {
	const run = await getCurrentRunForUser(req.session.userId!);

	res.status(200).json({
		run: run ? toRunView(run) : null,
	});
}

type GetRunParams = {
	runId: string;
};

export async function getRunController(
	req: Request<GetRunParams>,
	res: Response<GetRunResponse | ApiErrorResponse>,
) {
	const run = await getRunForUser({
		userId: req.session.userId!,
		runId: req.params.runId,
	});

	if (!run) {
		res.status(404).json({
			error: "RUN_NOT_FOUND",
			message: "Run not found.",
		});
		return;
	}

	res.status(200).json({
		run: toRunView(run),
	});
}
