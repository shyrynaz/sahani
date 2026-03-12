import { Link, useRouterState } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
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
import { useMemo } from "react";
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
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

interface AppSidebarProps {
	userName?: string | null;
}

const navItems = [
	{ icon: LayoutDashboard, label: "Dashboard", href: "/" },
	{ icon: CalendarDays, label: "Weekly Planner", href: "/meal-planner" },
	{ icon: BookOpen, label: "Recipes", href: "/recipes" },
	{ icon: ShoppingCart, label: "Shopping List", href: "/shopping" },
	{ icon: PieChart, label: "Nutrition", href: "/nutrition" },
	{ icon: User, label: "User Account", href: "/account" },
];

export function AppSidebar({ userName }: AppSidebarProps) {
	const routerState = useRouterState();
	const activePath = routerState.location.pathname;

	const shoppingLists = useQuery(api.shoppingLists.list);

	const pendingItemsCount = useMemo(() => {
		const currentList = shoppingLists?.[0];
		if (!currentList) return 0;
		return currentList.items.filter((i) => !i.checked).length;
	}, [shoppingLists]);

	return (
		<Sidebar className="border-r border-sidebar-border">
			<SidebarHeader className="p-6">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
						<UtensilsCrossed className="w-4 h-4 text-white" />
					</div>
					<span className="font-bold text-lg text-sidebar-foreground">
						sahani
					</span>
				</Link>

				{/* User profile */}
				<div className="flex items-center gap-3 mt-4">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary/20 to-sidebar-primary/10 flex items-center justify-center">
						<span className="text-sm font-bold text-sidebar-foreground">
							{userName?.charAt(0).toUpperCase() || "U"}
						</span>
					</div>
					<div className="min-w-0">
						<p className="font-semibold text-sm text-sidebar-foreground truncate">
							{userName || "User"}
						</p>
						<Link
							to="/account"
							className="text-xs text-muted-foreground hover:text-sidebar-primary flex items-center gap-1 transition-colors"
						>
							Edit profile <span className="text-[10px]">✎</span>
						</Link>
					</div>
				</div>

				{/* CTA */}
				<div className="mt-3">
					<Button
						asChild
						className="w-full bg-sidebar-primary hover:bg-sahani-green-hover text-sidebar-primary-foreground rounded-xl h-12 font-bold shadow-lg shadow-primary/20 transition-all"
					>
						<Link to="/recipes/new">
							<Plus className="w-5 h-5 mr-2" />
							Add New Recipe
						</Link>
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
											asChild
											isActive={isActive}
											tooltip={item.label}
											className="rounded-xl h-10 font-semibold"
										>
											<Link to={item.href}>
												<item.icon className="w-5 h-5" />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
										{item.href === "/shopping" &&
											pendingItemsCount > 0 && (
												<SidebarMenuBadge className="bg-destructive text-white text-[10px] font-bold rounded-full min-w-[18px] text-center">
													{pendingItemsCount}
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
				{/* Pro plan card */}
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
						className="mt-3 w-full bg-card border-border text-sidebar-foreground font-bold hover:bg-sidebar-primary hover:border-sidebar-primary rounded-lg transition-all"
					>
						Upgrade
					</Button>
				</div>

				<SidebarSeparator className="my-2" />

				{/* Logout */}
				<button
					type="button"
					onClick={() => authClient.signOut()}
					className="flex items-center gap-3 px-2 py-2 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors w-full text-left"
				>
					<LogOut className="w-5 h-5" />
					<span>Logout</span>
				</button>
			</SidebarFooter>
		</Sidebar>
	);
}
