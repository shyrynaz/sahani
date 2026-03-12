import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";

const meta = {
	title: "UI/Dialog",
	component: Dialog,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Recipe</DialogTitle>
					<DialogDescription>Fill in the details for your new recipe.</DialogDescription>
				</DialogHeader>
				<p className="text-sm text-muted-foreground">Dialog content goes here.</p>
			</DialogContent>
		</Dialog>
	),
};
