'use client';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Link,
} from '@nextui-org/react';
import React, { FC, useState } from 'react';
import { CookieIcon, CookiePolicyModal, CookiePreferencesModal } from '.';
import { onCookieAccept } from '@/services';
import { acceptAllCookieConsent } from '@/types/cookies.d';

const CookieConsentModal: FC = () => {
	const [isCookieConsentOpen, setIsCookieConsentOpen] =
		useState<boolean>(true);
	const [isCookiePolicyOpen, setIsCookiePolicyOpen] =
		useState<boolean>(false);
	const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] =
		useState<boolean>(false);

	return (
		<>
			<Modal
				isOpen={isCookieConsentOpen}
				isDismissable={false}
				hideCloseButton={true}
				size='xl'
				placement='center'
				classNames={{
					backdrop:
						'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-row items-center justify-between gap-1 sm:flex-col sm:items-start sm:justify-normal'>
								<p className='text-2xl font-bold'>Cookies</p>
								<div className='sm:hidden'>
									<CookieIcon />
								</div>
							</ModalHeader>
							<div className='flex flex-row pb-4'>
								<div>
									<ModalBody>
										<p>
											We use cookies and similar
											technologies to help personalise
											content, tailor and measyre ads, and
											provide a better expe- rience. By
											clicking accept, you agree to this,
											as outlined in our&nbsp;
											{
												<Link
													color='success'
													underline='hover'
													as={'p'}
													className='cursor-pointer'
													onClick={() => {
														setIsCookieConsentOpen(
															false
														);
														setIsCookiePolicyOpen(
															true
														);
													}}
												>
													Cookies Policy
												</Link>
											}
											.
										</p>
									</ModalBody>
									<ModalFooter className='!grid !grid-cols-2'>
										<Button
											color='default'
											variant='solid'
											onPress={() => {
												setIsCookieConsentOpen(false);
												setIsCookiePreferencesOpen(
													true
												);
											}}
										>
											Preferences
										</Button>
										<Button
											color='success'
											variant='solid'
											onPress={() => {
												onCookieAccept(
													acceptAllCookieConsent
												);
												onClose();
											}}
										>
											Accept
										</Button>
									</ModalFooter>
								</div>
								<div className='hidden pr-6 sm:flex sm:items-center sm:justify-center'>
									<CookieIcon width={181.5} height={184.5} />
								</div>
							</div>
						</>
					)}
				</ModalContent>
			</Modal>
			<CookiePolicyModal
				isCookiePolicyOpen={isCookiePolicyOpen}
				setIsCookiePolicyOpen={setIsCookiePolicyOpen}
				setIsCookieConsentOpen={setIsCookieConsentOpen}
			/>
			<CookiePreferencesModal
				isCookiePreferencesOpen={isCookiePreferencesOpen}
			/>
		</>
	);
};

export default CookieConsentModal;
