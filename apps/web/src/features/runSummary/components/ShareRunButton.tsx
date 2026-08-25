import { useState } from "react";
import { Copy } from "pixelarticons/react/Copy";
import { Share } from "pixelarticons/react/Share";
import { Button } from "../../../components/Button";

type ShareRunButtonProps = {
	title: string;
	text: string;
};

export function ShareRunButton({ title, text }: ShareRunButtonProps) {
	const canShare = typeof navigator.share === "function";
	const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

	async function shareResult() {
		const url = new URL("/", window.location.href).toString();
		setStatus("idle");

		try {
			if (canShare) {
				await navigator.share({ title, text, url });
				return;
			}

			await navigator.clipboard.writeText(`${text}\n${url}`);
			setStatus("copied");
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				return;
			}

			setStatus("error");
		}
	}

	const label = canShare ? "Share Result" : status === "copied" ? "Result Copied" : "Copy Result";
	const Icon = canShare ? Share : Copy;

	return (
		<div className="grid justify-items-center gap-2">
			<p className="max-w-xl text-center text-text">
				Challenge another hero to brave the adventure. Can they do better?
			</p>
			<Button className="gap-2" type="button" variant="secondary" onClick={shareResult}>
				<Icon className="h-5 w-5" aria-hidden="true" />
				<span>{label}</span>
			</Button>
			{status === "error" && (
				<p className="text-text-muted" role="status">
					Unable to share this result.
				</p>
			)}
		</div>
	);
}
