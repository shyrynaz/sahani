import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	BookOpen,
	CalendarDays,
	LayoutDashboard,
	LogOut,
	PieChart,
	Plus,
	ShoppingCart,
	Sparkles,
	User,
	UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";

/**
 * Mock PageLayout for Storybook (no Convex/router dependencies).
 */
function MockPageLayout({ children }: { children?: React.ReactNode }) {
	const navItems = [
		{ icon: LayoutDashboard, label: "Dashboard", href: "/" },
		{ icon: CalendarDays, label: "Weekly Planner", href: "/meal-planner" },
		{ icon: BookOpen, label: "Recipes", href: "/recipes" },
		{ icon: ShoppingCart, label: "Shopping List", href: "/shopping" },
		{ icon: PieChart, label: "Nutrition", href: "/nutrition" },
		{ icon: User, label: "User Account", href: "/account" },
	];

	return (
		<SidebarProvider>
			<Sidebar className="border-r border-sidebar-border">
				<SidebarHeader className="p-6">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
							<UtensilsCrossed className="w-4 h-4 text-white" />
						</div>
						<span className="font-bold text-lg text-sidebar-foreground">
							sahani
						</span>
					</div>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Menu</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navItems.map((item) => (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton isActive={item.href === "/"}>
											<item.icon className="w-5 h-5" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="p-4">
					<button
						type="button"
						className="flex items-center gap-3 px-2 py-2 text-sm font-bold text-muted-foreground w-full"
					>
						<LogOut className="w-5 h-5" />
						<span>Logout</span>
					</button>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<main className="flex-1 p-8 bg-secondary min-h-screen">
					{children || (
						<div>
							<h1 className="text-3xl font-black text-foreground mb-4">
								Page Title
							</h1>
							<p className="text-muted-foreground">
								This is the main content area provided by PageLayout.
							</p>
						</div>
					)}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

const meta = {
	title: "Sahani/PageLayout",
	component: MockPageLayout,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof MockPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
	args: {
		children: (
			<div className="space-y-6">
				<h1 className="text-3xl font-black text-foreground">Dashboard</h1>
				<div className="grid grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-card p-6 rounded-3xl border border-border"
						>
							<p className="text-sm text-muted-foreground">Card {i}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
};
