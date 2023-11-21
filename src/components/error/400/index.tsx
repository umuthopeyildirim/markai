import NextImage from "next/image";
import NextLink from "next/link";

export default function NotFoundPage() {
	return (
		<div className="mx-auto grid max-w-screen-xl flex-1 grid-cols-1 items-center justify-center gap-4 px-4 max-sm:my-4 sm:grid-cols-3 md:px-8">
			<div className="order-2 col-span-1 mx-auto sm:order-1 sm:col-span-2">
				<p className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-8xl">
					Whoops!
				</p>
				<br />
				<p className="text-4xl font-bold md:text-6xl lg:text-8xl">
					This page got lost in space.
				</p>
				<br />
				<p className="text-2xl md:text-3xl lg:text-4xl">
					Let&apos;s get you back to{" "}
					{
						<NextLink href="/" className="text-success underline">
							earth
						</NextLink>
					}
					.
				</p>
			</div>
			<div className="order-1 col-span-1 max-sm:mx-auto max-sm:max-w-xs sm:order-2">
				<NextImage
					alt="404 Image"
					src="/404.svg"
					sizes="100vw"
					style={{
						width: "100%",
						height: "auto",
					}}
					width={1222}
					height={923}
				/>
			</div>
		</div>
	);
}
