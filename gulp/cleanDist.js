import { Path } from './constants.js';
import { deleteAsync } from 'del';

const cleanDist = async (done) => {
	await deleteAsync(Path.DEST);
	done();
};

export default cleanDist;
