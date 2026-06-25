import type { RunView } from "@app/shared";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { HeroSidebar } from "./HeroSidebar";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	function handleEnterCombat() {
		applyRunAction.mutate(
			{
				runId: run.id,
				action: {
					type: "ENTER_COMBAT",
				},
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError("Unable to communicate with the server. Please try again.");
				},
			},
		);
	}

	function handleOpenSidebar() {
		setSidebarOpen(true);
	}

	function handleCloseSidebar() {
		setSidebarOpen(false);
	}

	return (
		<Layout>
			<div className="flex flex-1 bg-bg-base text-base">
				<HeroSidebar run={run} open={sidebarOpen} onClose={handleCloseSidebar} />

				<section className="flex min-w-0 flex-1 flex-col">
					<header className="px-4 py-3 md:hidden">
						<Button className="text-primary" type="button" onClick={handleOpenSidebar}>
							Hero
						</Button>
					</header>

					<div className="flex flex-1 items-center justify-center px-4">
						<div className="grid justify-items-center gap-4">
							<h1 className="text-base text-text-bright">Town</h1>
							<Button
								className="text-primary"
								type="button"
								onClick={handleEnterCombat}
							>
								Enter Combat
							</Button>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
}
