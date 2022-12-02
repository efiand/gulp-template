import { Breakpoint } from '../scripts/common/constants.js';
import { getImages } from './common/utils.js';

export default () => ({
	Breakpoint,
	description: 'Описание сайта',
	logo: getImages({ additions: { alt: 'Логотип компании.' }, file: 'logo.svg' }),
	project: 'Site'
});
