import { connect } from 'react-redux';
import Categories from './Categories';
import {setCategories} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    categories: state.filter.settings.categories
  };
}

const mapDispatchToProps = dispatch => { 
  return {     
    setCategories: (categories) => {
      return dispatch(setCategories(categories))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
