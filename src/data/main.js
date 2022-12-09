import { Breakpoint } from '../scripts/constants.js';
import { getImages } from './utils.js';

export default () => ({
	Breakpoint,
	description: 'Описание сайта',
	logo: getImages('logo.svg', { alt: 'Логотип компании' }),
	project: 'Site',
	widgets: [['Form']]
});
