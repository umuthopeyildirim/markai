'use client';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ScrollShadow,
	ModalBody,
	ModalFooter,
	Button,
	Link,
} from '@nextui-org/react';
import React, { FC, Dispatch, SetStateAction } from 'react';

interface CookiePolicyModalProps {
	isCookiePolicyOpen: boolean;
	setIsCookiePolicyOpen: Dispatch<SetStateAction<boolean>>;
	setIsCookieConsentOpen: Dispatch<SetStateAction<boolean>>;
}

const CookiePolicyModal: FC<CookiePolicyModalProps> = ({
	isCookiePolicyOpen,
	setIsCookiePolicyOpen,
	setIsCookieConsentOpen,
}) => {
	return (
		<Modal
			isOpen={isCookiePolicyOpen}
			isDismissable={false}
			hideCloseButton={true}
			size='5xl'
			placement='center'
			scrollBehavior='inside'
			classNames={{
				backdrop:
					'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							<p className='text-3xl font-bold'>Cookie Policy</p>
						</ModalHeader>
						<ScrollShadow>
							<ModalBody>
								<div className='flex flex-col gap-2'>
									<p className='text-xl font-semibold'>
										Manage Cookies
									</p>
									<p className='text-sm'>
										Cookies are small text files that are
										stored on your device when you visit a
										website. We use cookies to provide a
										better user experience, analyze how
										users interact with our website, and to
										personalize content and ads.
									</p>
								</div>
								<div className='flex flex-col gap-2'>
									<p className='text-xl font-semibold'>
										Cookies We Use
									</p>
									<p className='text-sm'>
										We use cookies to provide a better
										experience on our website and to
										understand how visitors interact with
										our content. Here are the cookies we
										use:
									</p>
								</div>
								<div className='flex flex-col gap-2'>
									<p className='text-lg font-semibold'>
										Vercel Analytics
									</p>
									<p className='text-sm'>
										We use Vercel Analytics to collect
										information about how visitors use our
										website. This information is used to
										create reports and help us improve the
										website. Vercel Analytics cookies
										collect information in an anonymous
										form, including the number of visitors
										to the website and blog, where visitors
										have come to the website from and the
										pages they visited.
									</p>
								</div>
								<div className='flex flex-col gap-2'>
									<p className='text-lg font-semibold'>
										Lemon Squeezy (Required)
									</p>
									<div className='flex flex-col gap-4'>
										<p className='text-sm'>
											We use Lemon Squeezy as our payment
											gateway which allows websites to
											process online payments securely and
											easily. When a user makes a payment
											on your website using Lemon Squeezy,
											their payment information (such as
											their credit card details) needs to
											be stored temporarily while the
											payment is being processed. Please
											review the&nbsp;
											{
												<Link
													href='https://www.lemonsqueezy.com/privacy'
													color='success'
													underline='hover'
													className='text-sm'
												>
													https://www.lemonsqueezy.com/privacy
												</Link>
											}
											&nbsp;for Lemon Squeezy cookies.
										</p>
										<p className='text-sm'>
											To enable this, Lemon Squeezy uses
											cookies to store information about
											the user&apos;s session, such as
											their session ID and the status of
											their payment. These cookies are
											necessary for the payment process to
											work properly, and they are stored
											on the user&apos;s browser until the
											payment process is complete.
										</p>
										<p className='text-sm'>
											In addition to payment-related
											cookies, Lemon Squeezy may also use
											other cookies on your website to
											improve performance, analyze how
											users interact with the website, and
											provide relevant advertising.
											However, these additional cookies
											are optional and you can choose to
											disable them if you prefer. Lemon
											Squeezy&apos;s use of cookies is
											subject to their own privacy policy,
											which you should review if you have
											any specific concerns.
										</p>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<p className='text-lg font-semibold'>
										Authentication (Required)
									</p>
									<p className='text-sm'>
										We use clerk to authenticate users on
										our application. Clerk is a library
										which allows users to authenticate using
										various third party services, such as
										google, which makes it easy to sign up
										and start using our application.
									</p>
								</div>
							</ModalBody>
						</ScrollShadow>
						<ModalFooter className='flex justify-center'>
							<Button
								color='default'
								variant='solid'
								onPress={() => {
									onClose();
									setIsCookieConsentOpen(true);
									setIsCookiePolicyOpen(false);
								}}
							>
								Back
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CookiePolicyModal;
