import { connect } from 'react-redux';
import Categories from './Categories';
import {setTemporaryCategories} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    chosenCategories: state.filter.settings.categories,
    temporaryCategories: state.filter.temporaryCategories
  };
}

const mapDispatchToProps = dispatch => { 
  return {     
    setTemporaryCategories: (categories) => {
      return dispatch(setTemporaryCategories(categories))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
