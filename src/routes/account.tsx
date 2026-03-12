import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
	Bell,
	Camera,
	ChevronRight,
	CreditCard,
	Eye,
	Globe,
	Heart,
	Key,
	Loader2,
	Lock,
	LogOut,
	Mail,
	Shield,
	Target,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageLayout } from "@/components/sahani/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/account" as any)({
	component: AccountPage,
});

function AccountPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("profile");

	const nutritionTargets = useQuery(api.nutritionTargets.get);
	const upsertNutritionTargets = useMutation(api.nutritionTargets.upsert);

	const [calories, setCalories] = useState(2000);
	const [protein, setProtein] = useState(150);
	const [carbs, setCarbs] = useState(250);
	const [fat, setFat] = useState(65);

	useEffect(() => {
		if (nutritionTargets) {
			setCalories(nutritionTargets.dailyCalories);
			setProtein(nutritionTargets.proteinGrams || 150);
			setCarbs(nutritionTargets.carbsGrams || 250);
			setFat(nutritionTargets.fatGrams || 65);
		}
	}, [nutritionTargets]);

	const handleSaveNutrition = async () => {
		try {
			await upsertNutritionTargets({
				dailyCalories: calories,
				proteinGrams: protein,
				carbsGrams: carbs,
				fatGrams: fat,
			});
			alert("Nutrition targets updated!");
		} catch (error) {
			console.error("Failed to update nutrition targets:", error);
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

	const tabs = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "nutrition", label: "Nutrition Goals", icon: Target },
		{ id: "dietary", label: "Dietary Preferences", icon: Heart },
		{ id: "security", label: "Security", icon: Lock },
		{ id: "billing", label: "Billing", icon: CreditCard },
	];

	return (
		<PageLayout userName={session.user.name}>
				<div className="max-w-5xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-black text-foreground tracking-tight">Account Settings</h1>
						<p className="text-muted-foreground mt-1 font-medium">
							Manage your profile, dietary goals, and account security.
						</p>
					</div>

					<div className="flex gap-8">
						{/* Nav Tabs */}
						<div className="w-64 flex flex-col gap-1">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
										activeTab === tab.id
											? "bg-card text-primary shadow-sm border border-border"
											: "text-muted-foreground hover:bg-card/50"
									}`}
								>
									<tab.icon className="w-5 h-5" />
									{tab.label}
								</button>
							))}
							<div className="mt-8 pt-6 border-t border-border">
								<button
									onClick={() => authClient.signOut()}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-red-50 transition-all w-full text-left"
								>
									<LogOut className="w-5 h-5" />
									Logout from devices
								</button>
							</div>
						</div>

						{/* Content Area */}
						<div className="flex-1">
							{activeTab === "profile" && (
								<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
									<div className="p-8 border-b border-border bg-secondary/50">
										<h2 className="text-xl font-black text-foreground">Profile Information</h2>
										<p className="text-xs text-muted-foreground mt-1 font-medium">Update your photo and personal details.</p>
									</div>
									<div className="p-8 space-y-8">
										<div className="flex items-center gap-6">
											<div className="relative group">
												<div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-white shadow-md overflow-hidden">
													<span className="text-3xl font-black text-foreground">
														{session.user.name?.charAt(0).toUpperCase()}
													</span>
												</div>
												<button className="absolute -bottom-2 -right-2 w-8 h-8 bg-card rounded-xl shadow-lg border border-border flex items-center justify-center text-primary hover:bg-secondary transition-all">
													<Camera className="w-4 h-4" />
												</button>
											</div>
											<div>
												<h3 className="font-bold text-foreground">{session.user.name}</h3>
												<p className="text-sm text-muted-foreground font-medium">{session.user.email}</p>
												<div className="flex gap-2 mt-3">
													<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-border">
														Change Photo
													</Button>
													<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold text-destructive border-destructive/20 hover:bg-red-50">
														Remove
													</Button>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-6">
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Full Name</Label>
												<div className="relative">
													<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sahani-tertiary" />
													<Input 
														defaultValue={session.user.name || ""} 
														className="pl-10 h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
													/>
												</div>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Email Address</Label>
												<div className="relative">
													<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sahani-tertiary" />
													<Input 
														defaultValue={session.user.email} 
														disabled
														className="pl-10 h-12 border-border rounded-xl bg-secondary font-bold text-sahani-tertiary"
													/>
												</div>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Language</Label>
												<div className="relative">
													<Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sahani-tertiary" />
													<Input 
														defaultValue="English (US)" 
														className="pl-10 h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
													/>
												</div>
											</div>
										</div>

										<div className="pt-4 flex justify-end">
											<Button className="bg-primary hover:bg-sahani-green-hover text-foreground font-black px-8 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all">
												Save Changes
											</Button>
										</div>
									</div>
								</div>
							)}

							{activeTab === "nutrition" && (
								<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
									<div className="p-8 border-b border-border bg-secondary/50">
										<h2 className="text-xl font-black text-foreground">Daily Nutrition Targets</h2>
										<p className="text-xs text-muted-foreground mt-1 font-medium">Set your daily macronutrient and calorie goals.</p>
									</div>
									<div className="p-8 space-y-8">
										<div className="grid grid-cols-2 gap-6">
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Daily Calories (kcal)</Label>
												<Input 
													type="number"
													value={calories} 
													onChange={(e) => setCalories(Number(e.target.value))}
													className="h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Protein (g)</Label>
												<Input 
													type="number"
													value={protein} 
													onChange={(e) => setProtein(Number(e.target.value))}
													className="h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Carbs (g)</Label>
												<Input 
													type="number"
													value={carbs} 
													onChange={(e) => setCarbs(Number(e.target.value))}
													className="h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-black text-sahani-tertiary uppercase tracking-wider">Fat (g)</Label>
												<Input 
													type="number"
													value={fat} 
													onChange={(e) => setFat(Number(e.target.value))}
													className="h-12 border-border rounded-xl focus-visible:ring-primary/50 font-bold"
												/>
											</div>
										</div>

										<div className="pt-4 flex justify-end">
											<Button 
												onClick={handleSaveNutrition}
												className="bg-primary hover:bg-sahani-green-hover text-foreground font-black px-8 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all"
											>
												Update Targets
											</Button>
										</div>
									</div>
								</div>
							)}

							{activeTab === "dietary" && (
								<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
									<div className="p-8 border-b border-border bg-secondary/50">
										<h2 className="text-xl font-black text-foreground">Dietary Preferences</h2>
										<p className="text-xs text-muted-foreground mt-1 font-medium">Customise your sahani experience.</p>
									</div>
									<div className="p-8 space-y-8">
										<div className="grid grid-cols-2 gap-8">
											<div className="space-y-6">
												<h3 className="text-sm font-black text-foreground uppercase tracking-wider">Primary Diet</h3>
												<div className="space-y-3">
													{["Vegan", "Vegetarian", "Pescatarian", "Keto", "Paleo", "No Preference"].map((diet) => (
														<label key={diet} className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border cursor-pointer hover:border-primary transition-all group">
															<span className="font-bold text-foreground">{diet}</span>
															<div className={`w-5 h-5 rounded-full border-2 ${diet === "No Preference" ? "border-primary bg-primary" : "border-border group-hover:border-primary"}`}>
																{diet === "No Preference" && <div className="w-full h-full flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-card" /></div>}
															</div>
														</label>
													))}
												</div>
											</div>
											<div className="space-y-6">
												<h3 className="text-sm font-black text-foreground uppercase tracking-wider">Health Goals</h3>
												<div className="space-y-4">
													{[
														{ label: "Weight Loss", desc: "Focus on calorie deficit meals" },
														{ label: "Muscle Gain", desc: "Higher protein targets" },
														{ label: "Maintenance", desc: "Balanced nutritional intake" },
														{ label: "Heart Healthy", desc: "Low sodium and healthy fats" },
													].map((goal) => (
														<div key={goal.label} className="p-4 bg-card rounded-2xl border border-border flex items-start gap-4 hover:shadow-md transition-all cursor-pointer group">
															<div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
																<Heart className="w-5 h-5" />
															</div>
															<div>
																<p className="font-bold text-foreground">{goal.label}</p>
																<p className="text-xs text-muted-foreground font-medium">{goal.desc}</p>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{activeTab === "security" && (
								<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
									<div className="p-8 border-b border-border bg-secondary/50">
										<h2 className="text-xl font-black text-foreground">Security Settings</h2>
										<p className="text-xs text-muted-foreground mt-1 font-medium">Keep your account safe and secure.</p>
									</div>
									<div className="p-8 space-y-6">
										<div className="space-y-4">
											<div className="flex items-center justify-between p-6 bg-secondary rounded-2xl border border-border">
												<div className="flex items-center gap-4">
													<div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-primary shadow-sm">
														<Key className="w-6 h-6" />
													</div>
													<div>
														<p className="font-bold text-foreground">Password</p>
														<p className="text-xs text-muted-foreground font-medium">Last changed 3 months ago</p>
													</div>
												</div>
												<Button variant="outline" className="rounded-xl font-bold border-border">Update</Button>
											</div>

											<div className="flex items-center justify-between p-6 bg-secondary rounded-2xl border border-border">
												<div className="flex items-center gap-4">
													<div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-primary shadow-sm">
														<Shield className="w-6 h-6" />
													</div>
													<div>
														<p className="font-bold text-foreground">Two-Factor Authentication</p>
														<p className="text-xs text-muted-foreground font-medium">Adds an extra layer of security to your account</p>
													</div>
												</div>
												<Switch />
											</div>

											<div className="flex items-center justify-between p-6 bg-secondary rounded-2xl border border-border">
												<div className="flex items-center gap-4">
													<div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-primary shadow-sm">
														<Eye className="w-6 h-6" />
													</div>
													<div>
														<p className="font-bold text-foreground">Login Activity</p>
														<p className="text-xs text-muted-foreground font-medium">View your recent login locations</p>
													</div>
												</div>
												<ChevronRight className="w-5 h-5 text-sahani-tertiary" />
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
		</PageLayout>
	);
}
