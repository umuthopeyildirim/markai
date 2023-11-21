'use client';

import { Divider, Switch } from '@nextui-org/react';
import { cookieConsentKeys as consentKeys } from '@/types/cookies.d';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

interface CookiePreferencesListProps {
	data: Record<string, boolean>;
	onDataChange: Dispatch<SetStateAction<Record<string, boolean>>>;
}

const CookiePreferencesList: FC<CookiePreferencesListProps> = ({
	data,
	onDataChange,
}) => {
	const options = [
		{
			name: 'Strictly Necessary Cookies',
			color: 'success',
			isDisabled: true,
			isSelected: data[consentKeys.strictlyNecessary],
			keyName: consentKeys.strictlyNecessary,
		},
		{
			name: 'Analytics Cookies',
			color: 'success',
			isDisabled: false,
			isSelected: data[consentKeys.analytics],
			keyName: consentKeys.analytics,
		},
	];
	const [states, setStates] = useState<boolean[]>(
		options.map((option) => option.isSelected)
	);

	const toggleState = (index: number) => {
		const newStates = [...states];
		newStates[index] = !newStates[index];
		setStates(newStates);
	};

	return (
		<div className='flex flex-col'>
			{states.length > 0 &&
				options.map((option, index) => (
					<div key={index}>
						<div className='flex flex-row justify-between'>
							<p>{option.name}</p>
							<Switch
								color={
									option.color as
										| 'success'
										| 'default'
										| 'primary'
										| 'secondary'
										| 'warning'
										| 'danger'
										| undefined
								}
								isSelected={states[index]}
								isDisabled={option.isDisabled}
								onValueChange={() => {
									toggleState(index);
									onDataChange((prev) => ({
										...prev,
										[option.keyName]: !states[index],
									}));
								}}
							></Switch>
						</div>
						{index !== options.length - 1 && (
							<Divider className='my-4' />
						)}
					</div>
				))}
		</div>
	);
};

export default CookiePreferencesList;
