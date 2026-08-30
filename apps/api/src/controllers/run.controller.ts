import type { Request, Response } from "express";
import type {
	ApiErrorResponse,
	ApplyRunActionBody,
	ApplyRunActionResponse,
	CreateRunBody,
	CreateRunResponse,
	CurrentRunResponse,
	GetRunHeroResponse,
	GetRunResponse,
} from "@app/shared";
import {
	createRun,
	getCurrentRunForUser,
	getRunForHero,
	getRunActions,
	getRunForUser,
} from "../services/run.service";
import { toApplyRunActionResponse, toRunHeroView, toRunView } from "../services/projection.service";
import { applyRunAction } from "../services/engine.service";
import { getRegisteredDisplayName } from "../services/publicIdentity.service";

export async function createRunController(
	req: Request<never, CreateRunResponse, CreateRunBody>,
	res: Response<CreateRunResponse>,
) {
	const run = await createRun({
		userId: req.session.userId!,
		heroName: req.body.heroName,
		classId: req.body.classId,
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

export async function getRunHeroController(
	req: Request<GetRunParams>,
	res: Response<GetRunHeroResponse | ApiErrorResponse>,
) {
	const run = await getRunForHero(req.params.runId);
	const displayName = run ? await getRegisteredDisplayName(run.userId) : null;
	const view = run ? toRunHeroView(run.state, displayName) : null;

	if (!view) {
		res.status(404).json({
			error: "RUN_NOT_FOUND",
			message: "Completed run not found.",
		});
		return;
	}

	res.status(200).json(view);
}

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

export async function applyRunActionController(
	req: Request<{ runId: string }, ApplyRunActionResponse, ApplyRunActionBody>,
	res: Response<ApplyRunActionResponse>,
) {
	const response = await applyRunAction({
		userId: req.session.userId!,
		runId: req.params.runId,
		action: req.body.action,
	});

	res.status(200).json(
		toApplyRunActionResponse(response.run, response.result, response.unlockedAchievements),
	);
}

export async function getRunActionsController(req: Request<{ runId: string }>, res: Response) {
	const actions = await getRunActions({
		userId: req.session.userId!,
		runId: req.params.runId,
	});

	res.status(200).json({
		actions,
	});
}
