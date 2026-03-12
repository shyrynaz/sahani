import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta = {
	title: "UI/Card",
	component: Card,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullComposition: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Meal Summary</CardTitle>
				<CardDescription>Your nutrition overview for today</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">1,850 calories consumed out of 2,000 target.</p>
			</CardContent>
			<CardFooter>
				<Button size="sm">View Details</Button>
			</CardFooter>
		</Card>
	),
};

export const HeaderOnly: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Quick Stats</CardTitle>
				<CardDescription>At a glance</CardDescription>
			</CardHeader>
		</Card>
	),
};

export const WithFooter: Story = {
	render: () => (
		<Card>
			<CardContent className="pt-6">
				<p className="text-sm">Simple card with footer actions.</p>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button variant="outline" size="sm">Cancel</Button>
				<Button size="sm">Save</Button>
			</CardFooter>
		</Card>
	),
};
