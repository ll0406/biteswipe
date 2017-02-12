import { connect } from 'react-redux';
import Categories from './Categories';
import {getCategories} from '../../action-creators/categories';
import {setTemporaryCategories} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    chosenCategories: state.filter.settings.categories,
    temporaryCategories: state.filter.temporaryCategories,
  	categories: state.categories
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
  	getCategories: () => {
  		return dispatch(getCategories());
  	},
    setTemporaryCategories: categories => {
      return dispatch(setTemporaryCategories(categories));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
