"use client";

import React, { useState, FC } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	NavbarItem,
	Link,
	Button,
	Skeleton,
	// Badge,
	// Dropdown,
	// DropdownTrigger,
	// DropdownMenu,
	// DropdownItem,
	// Modal,
	// ModalContent,
	// ModalHeader,
	// ModalBody,
	// ModalFooter,
	// useDisclosure,
	// Input,
} from "@nextui-org/react";
import {
	UserButton,
	SignedIn,
	SignedOut,
	ClerkLoaded,
	ClerkLoading,
} from "@clerk/nextjs";
// import { FaCartPlus, FaRotate, FaGift, FaCoins } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const Header: FC = () => {
	// const router = useRouter();
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const position = pathname.startsWith("/brands") ? "static" : "sticky";
	const signedInmenuItems = [
		{
			name: "Dashboard",
			href: "/dashboard",
		},
	];
	const signedOutMenuItems = [
		{
			name: "Demo",
			href: "/#demo",
		},
		{
			name: "Features",
			href: "/#features",
		},
		{
			name: "FAQ",
			href: "/#faqs",
		},
		// {
		// 	name: "Join Waitlist",
		// 	href: "/#apply",
		// },
	];

	return (
		<>
			<Navbar
				isBordered
				position={position}
				className="py-2"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				classNames={{
					wrapper: "!mx-auto !px-4 !max-w-screen-xl md:!px-8",
				}}
			>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="md:hidden"
					/>
					<NavbarBrand>
						<SignedIn>
							<Link color="foreground" href="/dashboard">
								<p className="font-bold text-inherit">MarkAI</p>
							</Link>
						</SignedIn>
						<SignedOut>
							<Link color="foreground" href="/">
								<p className="font-bold text-inherit">MarkAI</p>
							</Link>
						</SignedOut>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent
					className="hidden gap-4 md:flex"
					justify="center"
				>
					<SignedOut>
						<NavbarItem>
							<Link color="foreground" href="/">
								Hero
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="/#features">
								Features
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="/#faqs">
								FAQ
							</Link>
						</NavbarItem>
						{/* <NavbarItem>
							<Link color="foreground" href="/#apply">
								Join Waitlist
							</Link>
						</NavbarItem> */}
					</SignedOut>
					{/* <SignedIn>
						<NavbarItem>
							<Link color="foreground" href="/dashboard">
								Dashboard
							</Link>
						</NavbarItem>
					</SignedIn> */}
				</NavbarContent>

				<NavbarContent justify="end">
					<SignedIn>
						{/* <Dropdown>
							<Badge
								content="20"
								color="success"
								shape="circle"
								variant="flat"
								placement="top-right"
								className="absolute right-0 top-0"
							>
								<DropdownTrigger>
									<Button isIconOnly variant="light">
										<FaCoins size={25} />
									</Button>
								</DropdownTrigger>
							</Badge>
							<DropdownMenu
								variant="faded"
								aria-label="Dropdown menu with description"
							>
								<DropdownItem
									key="buy"
									description="Buy credits to your account"
									startContent={<FaCartPlus size={25} />}
									onClick={() => {
										router.push("/shop");
									}}
								>
									Buy Credit
								</DropdownItem>
								<DropdownItem
									key="license"
									description="If you have a license key, you can redeem it here"
									startContent={<FaGift size={25} />}
									onPress={onOpen}
								>
									License
								</DropdownItem>
								<DropdownItem
									key="refresh"
									description="Refresh credits to your account"
									startContent={<FaRotate size={25} />}
								>
									Refresh
								</DropdownItem>
							</DropdownMenu>
						</Dropdown> */}
						<ClerkLoading>
							<Skeleton className="flex h-8 w-8 rounded-full" />
						</ClerkLoading>
						<ClerkLoaded>
							<UserButton afterSignOutUrl="/" />
						</ClerkLoaded>
					</SignedIn>
					<SignedOut>
						<Button
							as={Link}
							href="/sign-in"
							color="default"
							variant="bordered"
							className="hidden rounded-md hover:bg-default-100 hover:text-white sm:flex"
						>
							Sign In
						</Button>
						<Button
							as={Link}
							href="/sign-up"
							className="hidden rounded-md bg-default-900 text-black hover:bg-zinc-800 hover:text-white sm:flex"
						>
							Sign Up
						</Button>
					</SignedOut>
				</NavbarContent>

				<SignedIn>
					<NavbarMenu className="pt-6">
						{signedInmenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color="foreground"
									className="w-full"
									href={item.href}
									size="lg"
									onClick={() => {
										setIsMenuOpen(false);
									}}
								>
									{item.name}
								</Link>
							</NavbarMenuItem>
						))}
					</NavbarMenu>
				</SignedIn>

				<SignedOut>
					<NavbarMenu className="pt-6">
						{signedOutMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color="foreground"
									className="w-full"
									href={item.href}
									size="lg"
									onClick={() => {
										setIsMenuOpen(false);
									}}
								>
									{item.name}
								</Link>
							</NavbarMenuItem>
						))}
						<NavbarMenuItem className="sm:hidden">
							<Button
								as={Link}
								href="/sign-in"
								color="default"
								variant="bordered"
								fullWidth={true}
								className="rounded-md hover:bg-default-100 hover:text-white"
							>
								Sign In
							</Button>
						</NavbarMenuItem>
						<NavbarMenuItem className="sm:hidden">
							<Button
								as={Link}
								href="/sign-up"
								fullWidth={true}
								className="rounded-md bg-default-900 text-black hover:bg-zinc-800 hover:text-white"
							>
								Sign Up
							</Button>
						</NavbarMenuItem>
					</NavbarMenu>
				</SignedOut>
			</Navbar>
			{/* Modal */}
			{/* <Modal
				size="xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="opaque"
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Activate your License Key
							</ModalHeader>
							<ModalBody>
								<p className="text-sm">
									The License Key you&apos;ve purchased can be
									found at the bottom of your receipt.
								</p>
								<Input
									size="lg"
									label="License Key"
									placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
									variant="bordered"
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="default"
									variant="flat"
									onPress={onClose}
								>
									Close
								</Button>
								<Button color="success" onPress={onClose}>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal> */}
		</>
	);
};

export default Header;
