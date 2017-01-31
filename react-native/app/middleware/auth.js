import {getAccessToken} from '../action-creators/auth';
import jwtDecode from 'jwt-decode';

export default ({dispatch, getState}) => next => action => {

	if(typeof action === 'function') return action(dispatch, getState);

	console.log(action);
	const accessToken = getState().auth.accessToken;

	if(accessToken) {
		const expiration = jwtDecode(accessToken).exp;
		// convert to minutes
		const difference = (new Date(expiration * 1000) - new Date) / (1000 * 60);
		console.log(difference);
		if(difference < 5) {
		}
	}

	return next(action);

} ;