Object.defineProperty(exports,"__esModule",{value:true});var _color=require('color');var _color2=_interopRequireDefault(_color);


import { colors } from '../colors';

var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=

{

tabBgColor:colors.primary,
tabFontSize:15,
tabTextColor:colors.primaryText,
// tabBgColor:'#F8F8F8',
// tabFontSize:15,
// tabTextColor:'#222222',

get darkenHeader(){
return(0,_color2.default)(this.tabBgColor).darken(0.03).hexString();
},

};




