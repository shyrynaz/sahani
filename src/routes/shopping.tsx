import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
	Calendar,
	CheckCircle2,
	ChevronRight,
	Download,
	Lightbulb,
	Loader2,
	Plus,
	Printer,
	Search,
	Settings,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/sahani/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/shopping")({
	component: ShoppingListPage,
});

function ShoppingListPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();
	const shoppingLists = useQuery(api.shoppingLists.list);
	const toggleItem = useMutation(api.shoppingLists.toggleItem);
	const deleteList = useMutation(api.shoppingLists.deleteList);
	
	const [searchQuery, setSearchQuery] = useState("");

	const currentList = useMemo(() => {
		return shoppingLists?.[0] || null;
	}, [shoppingLists]);

	const filteredItems = useMemo(() => {
		if (!currentList) return [];
		if (!searchQuery) return currentList.items;
		return currentList.items.filter(item => 
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [currentList, searchQuery]);

	const handleToggle = async (index: number) => {
		if (!currentList) return;
		await toggleItem({
			listId: currentList._id,
			itemIndex: index
		});
	};

	const handleDelete = async () => {
		if (!currentList) return;
		if (confirm("Are you sure you want to delete this shopping list?")) {
			await deleteList({ id: currentList._id });
		}
	};

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-secondary">
				<Loader2 className="w-8 h-8 text-primary animate-spin" />
			</div>
		);
	}

	if (!session?.user) {
		navigate({ to: "/login" });
		return null;
	}

	return (
		<PageLayout userName={session.user.name} className="p-0">
			<div className="flex overflow-hidden h-screen">
				{/* Column 2: Main List */}
				<div className="flex-1 flex flex-col bg-secondary overflow-y-auto">
					<div className="p-8 pb-4">
						<div className="flex items-start justify-between mb-2">
							<div>
								<h1 className="text-3xl font-black text-foreground tracking-tight">
									{currentList ? currentList.name : "Shopping List"}
								</h1>
								<p className="text-sm text-muted-foreground mt-1 font-medium">
									{currentList 
										? `${currentList.items.filter(i => !i.checked).length} items pending.`
										: "No active shopping list. Generate one from the planner!"}
								</p>
							</div>
							<div className="flex gap-3">
								<Button 
									variant="outline" 
									className="rounded-xl border-border bg-card h-11 font-bold text-foreground"
									onClick={() => navigate({ to: "/meal-planner" })}
								>
									<Calendar className="w-4 h-4 mr-2" />
									Plan Week
								</Button>
								{currentList && (
									<Button 
										variant="ghost" 
										className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 h-11 px-4 font-bold"
										onClick={handleDelete}
									>
										<Trash2 className="w-5 h-5" />
									</Button>
								)}
							</div>
						</div>

						{currentList && (
							<>
								<div className="relative mt-6 mb-8">
									<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sahani-tertiary" />
									<Input 
										placeholder="Search for items..." 
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="h-14 pl-12 bg-card border-border rounded-2xl shadow-sm focus-visible:ring-primary/50 text-lg"
									/>
								</div>

								<div className="space-y-6 pb-10">
									<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
										<div className="px-6 py-4 flex items-center justify-between border-b border-secondary">
											<div className="flex items-center gap-3">
												<div className="w-1 h-6 rounded-full bg-primary" />
												<h3 className="font-black text-foreground">Ingredients</h3>
											</div>
										</div>
										<div className="divide-y divide-secondary">
											{filteredItems.length === 0 ? (
												<div className="p-10 text-center">
													<p className="text-sahani-tertiary font-bold">No items found.</p>
												</div>
											) : (
												filteredItems.map((item, idx) => (
													<div 
														key={`${item.name}-${idx}`} 
														className={`p-6 flex items-center justify-between group transition-colors ${item.checked ? 'bg-secondary/50' : 'hover:bg-secondary'}`}
													>
														<div className="flex items-center gap-4">
															<div 
																onClick={() => handleToggle(idx)}
																className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
																	item.checked 
																		? "border-primary bg-primary" 
																		: "border-border bg-card hover:border-primary"
																}`}
															>
																{item.checked && <CheckCircle2 className="w-5 h-5 text-white" />}
															</div>
															<div>
																<p className={`font-bold transition-all ${item.checked ? 'text-sahani-tertiary line-through' : 'text-foreground'}`}>
																	{item.name}
																</p>
																<p className="text-xs text-sahani-tertiary font-medium mt-0.5">
																	{item.amount} {item.unit}
																</p>
															</div>
														</div>
													</div>
												))
											)}
										</div>
									</div>
								</div>
							</>
						)}

						{!currentList && shoppingLists !== undefined && (
							<div className="mt-20 text-center max-w-md mx-auto">
								<div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
									<Calendar className="w-10 h-10 text-sahani-tertiary" />
								</div>
								<h2 className="text-2xl font-black text-foreground mb-2">No shopping list yet</h2>
								<p className="text-muted-foreground font-medium mb-8">
									Go to your meal planner to select your recipes for the week, then click "Generate Shopping List".
								</p>
								<Button 
									onClick={() => navigate({ to: "/meal-planner" })}
									className="bg-primary hover:bg-sahani-green-hover text-foreground rounded-2xl h-14 px-8 font-black shadow-lg shadow-primary/20"
								>
									Open Meal Planner
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Column 3: Stats & Actions */}
				<div className="w-[380px] bg-card border-l border-border p-8 flex flex-col gap-8 overflow-y-auto">
					<div className="flex gap-3">
						<Button variant="outline" className="flex-1 rounded-xl border-border font-bold h-12" disabled={!currentList}>
							<Printer className="w-4 h-4 mr-2" />
							Print
						</Button>
						<Button variant="outline" className="flex-1 rounded-xl border-border font-bold h-12" disabled={!currentList}>
							<Download className="w-4 h-4 mr-2" />
							Export
						</Button>
					</div>

					{currentList && (
						<div className="bg-secondary rounded-3xl border border-border p-6">
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-black text-foreground text-lg">List Summary</h3>
								<Settings className="w-5 h-5 text-sahani-tertiary cursor-pointer hover:text-foreground transition-colors" />
							</div>

							<div className="text-center mb-6">
								<p className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-widest mb-1">Progress</p>
								<p className="text-4xl font-black text-foreground">
									{Math.round((currentList.items.filter(i => i.checked).length / currentList.items.length) * 100)}%
								</p>
								<p className="text-[11px] font-bold text-muted-foreground mt-1">
									<span className="text-foreground">{currentList.items.filter(i => i.checked).length}</span> of {currentList.items.length} items collected
								</p>
							</div>

							<div className="relative pt-1">
								<div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-border">
									<div 
										style={{ width: `${(currentList.items.filter(i => i.checked).length / currentList.items.length) * 100}%` }} 
										className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary rounded-full transition-all duration-500"
									></div>
								</div>
							</div>
						</div>
					)}

					<div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 relative overflow-hidden">
						<div className="flex items-start gap-4 relative z-10">
							<div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
								<Lightbulb className="w-6 h-6 text-white" />
							</div>
							<div>
								<h4 className="font-black text-foreground text-sm">Pro Tip</h4>
								<p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">
									Shop the perimeter of the grocery store first for fresh produce, meat, and dairy.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
