"use client";
import {
	FaBoltLightning,
	FaBrain,
	FaFire,
	FaMoneyBillWave,
	FaArrowsLeftRightToLine,
	FaBuilding,
} from "react-icons/fa6";

function LandingFeatures() {
	const features = [
		{
			icon: <FaBoltLightning size={25} />,
			title: "Delivered in seconds",
			desc: `Experience unparalleled speed with . Our AI-driven platform ensures your branding insights and tools are delivered in mere seconds, making brand-building efficient and instantaneous. Say goodbye to waiting and jumpstart your brand's journey immediately.`,
		},
		{
			icon: <FaBrain size={25} />,
			title: `100% created by AI`,
			desc: `Leverage the power of cutting-edge AI with . Every piece of content and branding material is autonomously generated, ensuring modernity and uniqueness. Plus, rest assured knowing you retain 100% rights to all AI-generated content, providing you with full ownership and peace of mind.`,
		},
		{
			icon: <FaFire size={25} />,
			title: "Variety of distinguished styles",
			desc: `Dive into 's vast collection of unique and impactful brand styles. Whether you're aiming for modern minimalism or timeless elegance, our platform offers a rich assortment to resonate with your brand's ethos and captivate your target audience. Tailor your branding journey with styles that truly represent your vision.`,
		},
		{
			icon: <FaMoneyBillWave size={25} />,
			title: "Affordable Prices",
			desc: `At , we believe in providing top-notch AI-driven branding solutions without breaking the bank. Our tiered credit system is designed to give you the best value for your money. Invest in your brand's future with , where affordability meets excellence.`,
		},
		{
			icon: <FaArrowsLeftRightToLine size={25} />,
			title: "1024x1024 High Resolution",
			desc: `Experience crystal-clear clarity with our 1024x1024 High Resolution feature. Whether it's for branding visuals, product displays, or any other graphics need, enjoy impeccable detail and precision, ensuring that your content stands out with the utmost quality.`,
		},
		{
			icon: <FaBuilding size={25} />,
			title: "Enterprise Support",
			desc: `Experience dedicated and personalized assistance with 's Enterprise Support. Catering specifically to the needs of large organizations, our expert team ensures smooth operations, prompt troubleshooting, and guidance tailored to your brand-building journey. When it comes to ensuring your brand's success and growth, you're never alone with  by your side.`,
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
							, say &apos;goodbye&apos; to traditional{" "}
							<span className="font-bold">
								revolutionary approach
							</span>{" "}
							to crafting an amazing brand.
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
