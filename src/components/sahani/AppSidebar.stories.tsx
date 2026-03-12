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
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeparator,
} from "@/components/ui/sidebar";

/**
 * A mock version of AppSidebar for Storybook (no Convex/router dependencies).
 */
function MockAppSidebar({
	userName = "Jane Muthoni",
	activePath = "/",
	pendingItems = 3,
}: { userName?: string; activePath?: string; pendingItems?: number }) {
	const navItems = [
		{ icon: LayoutDashboard, label: "Dashboard", href: "/" },
		{ icon: CalendarDays, label: "Weekly Planner", href: "/meal-planner" },
		{ icon: BookOpen, label: "Recipes", href: "/recipes" },
		{ icon: ShoppingCart, label: "Shopping List", href: "/shopping" },
		{ icon: PieChart, label: "Nutrition", href: "/nutrition" },
		{ icon: User, label: "User Account", href: "/account" },
	];

	return (
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
				<div className="flex items-center gap-3 mt-4">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary/20 to-sidebar-primary/10 flex items-center justify-center">
						<span className="text-sm font-bold text-sidebar-foreground">
							{userName.charAt(0)}
						</span>
					</div>
					<div>
						<p className="font-semibold text-sm text-sidebar-foreground">
							{userName}
						</p>
						<span className="text-xs text-muted-foreground">
							Edit profile ✎
						</span>
					</div>
				</div>
				<div className="mt-3">
					<Button className="w-full bg-sidebar-primary hover:bg-sahani-green-hover text-sidebar-primary-foreground rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
						<Plus className="w-5 h-5 mr-2" />
						Add New Recipe
					</Button>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs font-bold text-sahani-tertiary uppercase tracking-wider px-2">
						Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => {
								const isActive = activePath === item.href;
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											isActive={isActive}
											className="rounded-xl h-10 font-semibold"
										>
											<item.icon className="w-5 h-5" />
											<span>{item.label}</span>
										</SidebarMenuButton>
										{item.href === "/shopping" && pendingItems > 0 && (
											<SidebarMenuBadge className="bg-destructive text-white text-[10px] font-bold rounded-full min-w-[18px] text-center">
												{pendingItems}
											</SidebarMenuBadge>
										)}
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-4">
				<div className="bg-secondary border border-border rounded-2xl p-4">
					<div className="flex items-center gap-2 mb-1">
						<Sparkles className="w-4 h-4 text-sidebar-primary" />
						<p className="font-bold text-sm text-sidebar-foreground">
							Pro Plan
						</p>
					</div>
					<p className="text-xs text-muted-foreground mt-1">
						Get unlimited AI recipes and insights
					</p>
					<Button
						variant="outline"
						size="sm"
						className="mt-3 w-full bg-card border-border text-sidebar-foreground font-bold rounded-lg"
					>
						Upgrade
					</Button>
				</div>
				<SidebarSeparator className="my-2" />
				<button
					type="button"
					className="flex items-center gap-3 px-2 py-2 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors w-full text-left"
				>
					<LogOut className="w-5 h-5" />
					<span>Logout</span>
				</button>
			</SidebarFooter>
		</Sidebar>
	);
}

const meta = {
	title: "Sahani/AppSidebar",
	component: MockAppSidebar,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SidebarProvider>
				<div className="flex min-h-screen">
					<Story />
					<main className="flex-1 p-8 bg-secondary">
						<p className="text-muted-foreground">Main content area</p>
					</main>
				</div>
			</SidebarProvider>
		),
	],
} satisfies Meta<typeof MockAppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		userName: "Jane Muthoni",
		activePath: "/",
		pendingItems: 3,
	},
};

export const NutritionActive: Story = {
	args: {
		userName: "Jane Muthoni",
		activePath: "/nutrition",
		pendingItems: 0,
	},
};

export const NoBadge: Story = {
	args: {
		userName: "John Kamau",
		activePath: "/recipes",
		pendingItems: 0,
	},
};
