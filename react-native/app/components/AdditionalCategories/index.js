import { connect } from 'react-redux';
import AdditionalCategories from './AdditionalCategories';
import {setCategories} from '../../action-creators/filter';
import {getCategories} from '../../action-creators/categories';

const mapStateToProps = state => {
  return {
    chosenCategories: state.filter.settings.categories,
    categories: state.categories.catList
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    setCategories: (categories) => {
      dispatch(setCategories(categories));
    },
    getCategories: () => {
      dispatch(getCategories());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCategories);
