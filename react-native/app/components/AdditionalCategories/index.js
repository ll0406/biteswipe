import { connect } from 'react-redux';
import AdditionalCategories from './AdditionalCategories';
import {setCategories} from '../../action-creators/filter';
import {getCategories} from '../../action-creators/categories';

const mapStateToProps = state => {
  return {
    chosenCategories: state.filter.settings.categories,
    temporaryCategories: state.filter.temporaryCategories,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => { 
  return { 
    setCategories: (categories) => {
      return dispatch(setCategories(categories));
    },
    getCategories: () => {
      return dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCategories);
