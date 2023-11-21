'use client';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from '@nextui-org/react';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { CookieIcon, CookiePreferencesList } from '.';
import { onCookieAccept } from '@/services';
import { defaultCookieConsent } from '@/types/cookies.d';

interface CookiePreferencesModalProps {
	isCookiePreferencesOpen: boolean;
}

const CookiePreferencesModal: FC<CookiePreferencesModalProps> = ({
	isCookiePreferencesOpen,
}) => {
	const [preferences, setPreferences] =
		React.useState<Record<string, boolean>>(defaultCookieConsent);

	return (
		<>
			<Modal
				isOpen={isCookiePreferencesOpen}
				isDismissable={false}
				hideCloseButton={true}
				size='lg'
				placement='center'
				classNames={{
					backdrop:
						'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-row items-center justify-between gap-1'>
								<p className='text-2xl font-bold'>
									Managa Cookie Preferences
								</p>
								<CookieIcon />
							</ModalHeader>
							<ModalBody>
								<div className='flex flex-col gap-8'>
									<p>
										Here, you can tailor which types of
										cookies you&apos;d like us to use during
										your visit. Toggle on or off specific
										cookie categories based on your
										preferences. You can adjust your choices
										at any time.
									</p>
									<CookiePreferencesList
										data={preferences}
										onDataChange={setPreferences}
									/>
								</div>
							</ModalBody>
							<ModalFooter className='mt-4 !justify-start'>
								<Button
									color='success'
									variant='solid'
									onPress={() => {
										onCookieAccept(preferences);
										onClose();
									}}
								>
									Confirm my choices
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default CookiePreferencesModal;
