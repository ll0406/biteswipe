import {SET_CURRENT_TAB} from '../constants';

// tab is a position 0 or 1
export const setCurrentTab = tab => ({
	type: SET_CURRENT_TAB, tab
});