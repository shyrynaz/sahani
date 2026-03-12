import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";
import { PageLayout } from "@/components/sahani/PageLayout";

export const Route = createFileRoute("/")({
	component: RootPage,
});

function RootPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	if (session?.user) {
		return (
			<PageLayout userName={session.user.name}>
				<Dashboard userName={session.user.name} email={session.user.email} />
			</PageLayout>
		);
	}

	return <LandingPage />;
}
