import React, { FC } from 'react';

interface CookieIconProps {
	size?: number;
	width?: number;
	height?: number;
}

const CookieIcon: FC<CookieIconProps> = ({ size = 24, width, height }) => {
	return (
		<svg
			aria-hidden='true'
			fill='none'
			focusable='false'
			height={height || size}
			role='presentation'
			viewBox='0 0 121 123'
			width={width || size}
		>
			<g clipPath='url(#clip0_101_46)' filter='url(#filter0_i_101_46)'>
				<rect
					x='8'
					y='24'
					width='61'
					height='84'
					rx='30.5'
					fill='#9D5834'
				/>
				<rect
					x='42'
					y='72'
					width='54'
					height='36'
					rx='18'
					fill='#9D5834'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M98.18 0C101.48 0 104.16 2.68 104.16 5.98C104.16 9.28 101.48 11.96 98.18 11.96C94.88 11.96 92.2 9.28 92.2 5.98C92.21 2.68 94.88 0 98.18 0ZM99.78 52.08C104.94 59.78 111.47 62.14 119.95 56.93C120.23 59.83 120.3 62.79 120.15 65.79C118.48 98.95 90.25 124.48 57.09 122.81C23.94 121.13 -1.59001 92.9 0.0799936 59.75C1.73999 26.59 30.95 0.78 64.1 2.45C61.16 11.65 63.65 19.82 71.13 22.6C64.35 44.38 79.49 58.63 99.78 52.08ZM30.03 47.79C35 47.79 39.02 51.82 39.02 56.78C39.02 61.74 34.99 65.77 30.03 65.77C25.06 65.77 21.04 61.74 21.04 56.78C21.04 51.82 25.07 47.79 30.03 47.79ZM58.35 59.25C61.21 59.25 63.53 61.57 63.53 64.43C63.53 67.29 61.21 69.61 58.35 69.61C55.49 69.61 53.17 67.29 53.17 64.43C53.16 61.57 55.48 59.25 58.35 59.25ZM35.87 80.59C39.36 80.59 42.19 83.42 42.19 86.91C42.19 90.4 39.36 93.23 35.87 93.23C32.38 93.23 29.55 90.4 29.55 86.91C29.55 83.41 32.38 80.59 35.87 80.59ZM49.49 32.23C52.23 32.23 54.44 34.45 54.44 37.18C54.44 39.92 52.22 42.13 49.49 42.13C46.75 42.13 44.54 39.91 44.54 37.18C44.54 34.45 46.76 32.23 49.49 32.23ZM76.39 82.8C80.98 82.8 84.69 86.52 84.69 91.1C84.69 95.69 80.97 99.4 76.39 99.4C71.8 99.4 68.09 95.68 68.09 91.1C68.09 86.52 71.81 82.8 76.39 82.8ZM93.87 23.1C96.95 23.1 99.45 25.6 99.45 28.68C99.45 31.76 96.95 34.26 93.87 34.26C90.79 34.26 88.29 31.76 88.29 28.68C88.29 25.6 90.79 23.1 93.87 23.1Z'
					fill='#FBAD60'
				/>
			</g>
			<defs>
				<filter
					id='filter0_i_101_46'
					x='0'
					y='0'
					width='120.23'
					height='126.88'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0.87451 0 0 0 0 0.576471 0 0 0 0 0.278431 0 0 0 1 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_101_46'
					/>
				</filter>
				<clipPath id='clip0_101_46'>
					<rect width='120.23' height='122.88' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
export default CookieIcon;
