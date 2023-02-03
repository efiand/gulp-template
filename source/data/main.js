export default ({ pageName }) => ({
	isIndex: pageName === 'index',
	pixelperfect: JSON.stringify({ breakpoints: [320, 768, 1260], ext: 'jpg' }),
	projectName: 'My project'
});
