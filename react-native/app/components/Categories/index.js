import { connect } from 'react-redux';
import Categories from './Categories';
import {setCategories} from '../../action-creators/filter';
import {getCategories} from '../../action-creators/categories';

const mapStateToProps = state => {
  return {
    categories: state.filter.settings.categories
  };
}

const mapDispatchToProps = dispatch => { 
  return {     
    getCategories: () => {
      dispatch(getCategories())
    },
    setCategories: (categories) => {
      dispatch(setCategories(categories))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
