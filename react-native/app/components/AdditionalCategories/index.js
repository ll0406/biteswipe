import { connect } from 'react-redux';
import AdditionalCategories from './AdditionalCategories';

import {getCategories} from '../../action-creators/categories';
import {addCategory, removeCategory, getCurrentLocation, getSearchSettings, addSearchSettings, receiveSearchSettings} from '../../action-creators/filter';

const mapStateToProps = state => {
  console.log("are you here cats? ", state.filter.settings);
  return {
    location: state.filter.location,
    settings: state.filter.settings,
    categories: state.categories.catList
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    getCategories: () => {
      dispatch(getCategories())
    },
    addCategory: (category) => {
      dispatch(addCategory(category))
    },
    removeCategory: (category) => {
      dispatch(removeCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCategories);
