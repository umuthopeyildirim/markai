"use client";

import BrandSkeleton from "./BrandSkeleton";
import BrandCard from "./BrandCard";
import NewBrandCard from "./NewBrandCard";
import { useState, useEffect } from "react";
import { OrganizationSwitcher, useOrganization, useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/services/supabaseClient";

export default function DashboardPage({ userId, orgId }: any) {
	const { getToken } = useAuth();
	const { organization } = useOrganization();
	const [brands, setBrands] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userIdLoaded, setUserIdLoaded] = useState(false);

	// Your existing useEffect for fetching data based on organization
	useEffect(() => {
		if (
			(organization !== null ||
				organization === null ||
				organization === undefined) &&
			userIdLoaded
		) {
			handleFetchDataBrands();
		}
	}, [organization, userIdLoaded]);

	// New useEffect to wait for user.id to be loaded
	useEffect(() => {
		if (userId) {
			setUserIdLoaded(true);
		}
	}, [userId]);

	const handleFetchDataBrands = async () => {
		setIsLoading(true);
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);

		if (organization === null) {
			const { data, error } = await supabase
				.from("brands")
				.select()
				// Select where org_id is null
				.is("org_id", null)
				.eq("user_id", userId)
				.order("created_at", { ascending: false });
			if (error) {
				console.log(error);
			}
			if (data) {
				setBrands(data);
				setIsLoading(false);
			}
		} else {
			if (!organization?.id) return;
			const { data, error } = await supabase
				.from("brands")
				.select("*")
				.eq("org_id", organization?.id)
				.order("created_at", { ascending: false });
			if (error) {
				console.log(error);
			}
			if (data) {
				setBrands(data);
				setIsLoading(false);
			}
		}
	};

	return (
		<>
			<section className="mx-auto mt-12 min-h-full max-w-screen-xl px-4 md:p-8">
				<div className="flex w-full">
					<div className="grow text-start">
						<h1 className="text-3xl font-light md:text-5xl">
							Brands
						</h1>
					</div>
					<div className="grow-0 text-end">
						<OrganizationSwitcher afterSelectOrganizationUrl="/dashboard" />
					</div>
				</div>
				<div className="mt-12 grid w-full gap-10 sm:grid-cols-2 lg:grid-cols-3">
					<NewBrandCard />
					{!isLoading &&
						brands.length > 0 &&
						brands.map((brand) => (
							<BrandCard key={brand.id} brand={brand} />
						))}
					{/* Card Skeleton */}
					{isLoading && <BrandSkeleton />}
				</div>
			</section>
		</>
	);
}
