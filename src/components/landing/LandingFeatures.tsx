"use client";
import { FaBoltLightning, FaBrain, FaUserLock } from "react-icons/fa6";

function LandingFeatures() {
	const features = [
		{
			icon: <FaBoltLightning size={25} />,
			title: "Delivered in seconds",
			desc: `Experience unparalleled speed with MarkAI. Our AI-driven platform ensures your branding insights and tools are delivered in mere seconds. Note: This is based on your Supabase plan.`,
		},
		{
			icon: <FaBrain size={25} />,
			title: `Langchain Powered`,
			desc: `Leverage the power of cutting-edge AI with MarkAI&Langchain. All your content is available to OpenAI with Langchain agents.`,
		},
		{
			icon: <FaUserLock size={25} />,
			title: "Private and Secure",
			desc: `All your data is securly stored in your Supabase database. All controled by you. Users don't have access to other users data.`,
		},
	];
	return (
		<>
			<section id="features">
				<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						<h2 className="mx-auto text-4xl md:text-6xl ">
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text font-bold text-transparent">
								Need essential productivity tools?
							</span>{" "}
						</h2>
						<p className="mx-auto max-w-2xl text-xl">
							With MarkAI&apos;s{" "}
							<span className="font-bold">
								AI-driven capabilities
							</span>
							, you can increase your productivity and efficiency.
						</p>
					</div>
					<div className="relative mt-12">
						<ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{features.map((item, idx) => (
								<li
									key={idx}
									className="space-y-3 rounded-lg border border-content2 bg-content1 p-4"
								>
									<div className="pb-3 text-success">
										{item.icon}
									</div>
									<h4 className="text-lg font-semibold text-success">
										{item.title}
									</h4>
									<p>{item.desc}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

export default LandingFeatures;
