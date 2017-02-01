import {getAccessToken, updateGettingAccessToken} from '../action-creators/auth';
import {GETTING_ACCESS_TOKEN} from '../constants';
import jwtDecode from 'jwt-decode';

export default ({dispatch, getState}) => next => action => {

	// if not thunk return
	if(typeof action !== 'function') return next(action);

	const accessToken = getState().auth.accessToken;
	const gettingAccessToken = getState().auth.gettingAccessToken;

	if(accessToken) {
		const expiration = jwtDecode(accessToken).exp;
		// convert to minutes
		const difference = (new Date(expiration * 1000) - new Date) / (1000 * 60);

		if(accessToken && difference < 5 && !gettingAccessToken) {
			dispatch(updateGettingAccessToken(true));
			dispatch(getAccessToken());
		};
	};

	return action(dispatch, getState);

} ;