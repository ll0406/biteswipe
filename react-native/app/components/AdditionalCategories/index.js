import { connect } from 'react-redux';
import AdditionalCategories from './AdditionalCategories';
import {addCategory, removeCategory} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    chosenCategories: state.filter.settings.categories,
    categories: state.categories.catList
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    addCategory: (category) => {
      dispatch(addCategory(category))
    },
    removeCategory: (category) => {
      dispatch(removeCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCategories);
