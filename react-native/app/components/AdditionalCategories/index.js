import { connect } from 'react-redux';
import AdditionalCategories from './AdditionalCategories';
import {setTemporaryCategories} from '../../action-creators/filter';
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
    setTemporaryCategories: (categories) => {
      return dispatch(setTemporaryCategories(categories));
    },
    getCategories: () => {
      return dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCategories);
