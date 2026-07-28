import "dotenv/config";
import mongoose from "mongoose";
import { z } from "zod";
import { cleanupGuestAccounts } from "../services/guestCleanup.service";

const mongoUri = z.string().min(1, "MONGO_URI is required.").parse(process.env.MONGO_URI);
const arguments_ = process.argv.slice(2);
const unknownArguments = arguments_.filter((argument) => argument !== "--execute");

if (unknownArguments.length > 0) {
	throw new Error(`Unknown argument(s): ${unknownArguments.join(", ")}`);
}

const execute = arguments_.includes("--execute");

function printReport(report: Awaited<ReturnType<typeof cleanupGuestAccounts>>) {
	console.log(`Cleanup mode: ${report.mode === "execute" ? "EXECUTE" : "DRY RUN"}`);
	console.log(`Guest accounts examined: ${report.guestsExamined}`);
	console.log(`Empty guests eligible: ${report.emptyGuests}`);
	console.log(`Active runs eligible: ${report.activeRuns}`);
	console.log(`Abandoned runs eligible: ${report.abandonedRuns}`);
	console.log(`Run actions eligible: ${report.runActions}`);
	console.log(`Guest accounts deletable: ${report.deletableGuests}`);
	console.log(`Guest accounts retained for referenced history: ${report.retainedGuests}`);

	if (!execute) {
		console.log("No records were changed. Pass --execute to perform this cleanup.");
	}
}

try {
	await mongoose.connect(mongoUri);
	printReport(await cleanupGuestAccounts({ execute }));
} finally {
	await mongoose.disconnect();
}
