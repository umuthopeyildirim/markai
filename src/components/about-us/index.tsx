"use client";
import {
	FaArrowDown,
	FaEarthEurope,
	FaGithub,
	FaLinkedin,
} from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { Link, Image, Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect } from "react";
import NextImage from "next/image";

export default function AboutUsPage() {
	const controls = useAnimation();
	const team = [
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Umut Hope YILDIRIM",
			title: "Full Stack Engineer",
			desc: "I absolutely love using my coding powers to tackle meaningful challenges in the Software Industry, and I always aim to make a positive impact with my work. Plus, it's pretty much the closest thing to magic I'll ever experience.",
			linkedin: "https://www.linkedin.com/in/umuthopeyildirim/",
			github: "https://github.com/umuthopeyildirim",
			website: "https://umutyildirim.com",
		},
		{
			avatar: "/images/burak_yildirim.webp",
			name: "Burak YILDIRIM",
			title: "Full Stack Engineer",
			desc: "I'm skilled in cutting-edge tech with a strong background in web development and object-oriented programming. Experienced in agile and scrum, I'm seeking a software development internship to enhance my skills. I'm a quick learner and great team player.",
			linkedin: "https://www.linkedin.com/in/burak-yildrm/",
			github: "https://github.com/BurakYildrm",
		},
	];

	const testimonials = [
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
		{
			avatar: "/images/umut_hope_yildirim.webp",
			name: "Someone",
			desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!",
			star: 5,
		},
	];

	useEffect(() => {
		controls.start({
			y: [-10, 10, -10],
			transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
		});
	}, [controls]);
	return (
		<>
			<section className="mx-auto flex min-h-[calc(100vh_-_81px)] max-w-screen-xl flex-col px-4 md:p-8">
				<div className="flex flex-1 flex-col items-center justify-center">
					<div className="flex flex-col gap-4 text-5xl md:text-6xl xl:text-8xl">
						<h1 className="text-success">Work freely</h1>
						<h1 className="line-through">Work under pressure</h1>
						<h1 className="line-through">Work with crunch</h1>
						<h1 className="line-through">Work without coffee</h1>
					</div>
					<div className="mt-20 flex w-full flex-row items-center">
						<div className="mx-auto flex w-1/2 flex-row items-center gap-4">
							<Link
								href="#team"
								color="foreground"
								className="gap-4"
							>
								<motion.div animate={controls}>
									<FaArrowDown size={30} />
								</motion.div>
								<p className="text-sm sm:text-base">
									Learn more about us...
								</p>
							</Link>
						</div>
						<div className="w-1/2">
							<p className="text-sm italic sm:text-base">
								We are the visionary thinkers and innovators of
								our era.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section id="faq" className="mx-auto max-w-screen-xl px-4 md:p-8">
				<div className="grid grid-cols-1 gap-4 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8 lg:py-16">
					<div className="rounded-lg">
						<h1 className="text-8xl font-bold text-success">FAQ</h1>
						<p className="mt-10 text-2xl">
							Explore our comprehensive list of frequently asked
							questions to gain insights and find the answers
							you&apos;re looking for.
						</p>
					</div>
					<div className="rounded-lg lg:col-span-2">
						<Accordion>
							<AccordionItem title="What is this?">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam, voluptatum.
								</p>
							</AccordionItem>
							<AccordionItem title="What is this?">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam, voluptatum.
								</p>
							</AccordionItem>
							<AccordionItem title="What is this?">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam, voluptatum.
								</p>
							</AccordionItem>
							<AccordionItem title="What is this?">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam, voluptatum.
								</p>
							</AccordionItem>
							<AccordionItem title="What is this?">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam, voluptatum.
								</p>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
			<section id="testimonial">
				<div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
					<h2 className="text-center text-4xl font-bold tracking-tight text-success sm:text-5xl">
						See why our customers can&apos;t stop talking about us!{" "}
					</h2>

					<div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
						{testimonials.map((item, idx) => (
							<div
								key={idx}
								className="mb-8 sm:break-inside-avoid"
							>
								<blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
									<div className="flex items-center gap-4">
										<Image
											as={NextImage}
											width={66}
											height={66}
											alt={`${item.name} avatar`}
											src={item.avatar}
											className="h-14 w-14 rounded-full object-cover"
										/>

										<div>
											<div className="flex justify-center gap-0.5 text-green-500">
												{Array.from({
													length: item.star,
												}).map((_, idx) => (
													<svg
														key={idx}
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
													</svg>
												))}
											</div>

											<p className="mt-0.5 text-lg font-medium text-gray-900">
												{item.name}
											</p>
										</div>
									</div>

									<p className="mt-4 text-gray-700">
										{item.desc}
									</p>
								</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>
			<section
				id="team"
				className="mx-auto mt-12 max-w-screen-xl px-4 md:p-8"
			>
				<div className="flex flex-col gap-4 text-5xl md:text-6xl xl:text-8xl">
					<h1 className="text-success">Our Team</h1>
				</div>
				<div className="mt-12">
					<ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
						{team.map((item, idx) => (
							<li key={idx} className="flex gap-8">
								<div className="mt-4 flex flex-col sm:mt-0">
									<Image
										as={NextImage}
										height={500}
										width={500}
										src={item.avatar}
										className="m-auto mb-4 object-center shadow-md drop-shadow-md"
										alt={`${item.name} avatar`}
									/>
									<h4 className="text-white-700 text-lg font-semibold">
										{item.name}
									</h4>
									<p className="text-success">{item.title}</p>
									<p className="text-white-600 mt-2">
										{item.desc}
									</p>
									<div className="text-white-400 mt-3 flex gap-4">
										<Link
											href={item.github}
											target="_blank"
											rel="noopener"
											color="foreground"
										>
											<FaGithub size={20} />
										</Link>
										<Link
											href={item.linkedin}
											target="_blank"
											rel="noopener"
											color="foreground"
										>
											<FaLinkedin size={20} />
										</Link>
										{item.website && (
											<Link
												href={item.website}
												target="_blank"
												rel="noopener"
												color="foreground"
											>
												<FaEarthEurope size={20} />
											</Link>
										)}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}
