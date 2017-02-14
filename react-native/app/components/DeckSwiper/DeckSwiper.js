import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import clamp from 'clamp';

const SWIPE_THRESHOLD = 120;

// from NativeBase
export default class DeckSwiper extends Component {
	constructor(props) {
    super(props);

    const index = props.index || 0;
    const disabled = props.dataSource.length === 0;
    const lastCard = props.dataSource.length === 1;


    this.state = {
      pan: new Animated.ValueXY(),
      pan2: new Animated.ValueXY(),
      enter: new Animated.Value(0.8),
      selectedItem : props.dataSource[index],
      selectedItem2 : props.dataSource[index + 1],
      card1Top: true,
      card2Top: false,
      fadeAnim: new Animated.Value(0.8),
      index: index,
      disabled,
      lastCard
    };
  }

  getInitialStyle() {
    return {
      topCard: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
      }
    };
  }

  selectNext() {
  	const dataSource = this.props.dataSource;
    let index = this.state.index;
    this.setState({
    	index: index + 1
    });

    // reached end -> only display static renderEmpty() -> no swiping
    if(index === dataSource.length - 1) {
    	this.setState({
    	  disabled: true
    	});
    } else if(index === dataSource.length - 2) {
    	// show last card with renderEmpty() component behind it
    	setTimeout(() => {
    		this.setState({
    			selectedItem: dataSource[index + 1]
    		});
    	  setTimeout(() => {
    	    this.setState({
    	      lastCard: true
    	    });
    	  }, 350);
    	}, 50);
    } else {
    	setTimeout(() => {
    	  this.setState({
    	    selectedItem: dataSource[index + 1]
    	  });
    	  setTimeout(() => {
    	    this.setState({
    	      selectedItem2: dataSource[index + 2]
    	    });
    	  }, 350);
    	}, 50);
    }
  }

  swipeRight() {
    if(this.props.onSwiping)
    this.props.onSwiping('right');
    setTimeout( () => {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 7 }
    ).start();
    this.selectNext();
    Animated.decay(this.state.pan, {
      velocity: {x: 8, y: 1},
      deceleration: 0.98
    }).start(this._resetState.bind(this))
    }, 300);
  }

  swipeLeft() {
    if(this.props.onSwiping)
    this.props.onSwiping('left');
    setTimeout( () => {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 7 }
    ).start();
    this.selectNext();
    Animated.decay(this.state.pan, {
      velocity: {x: -8, y: 1},
      deceleration: 0.98
    }).start(this._resetState.bind(this))
    }, 300);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx > 20){
          if(this.props.onSwiping)
          this.props.onSwiping('right',gestureState.dx);
        }
        else if (gestureState.dx < -20){
          if(this.props.onSwiping)
          this.props.onSwiping('left',gestureState.dx);
        }
        let val = Math.abs((gestureState.dx*.0013));
        let opa = Math.abs((gestureState.dx*.0022));
        if (val>0.2) {
          val = 0.2;
        }
        Animated.timing(
          this.state.fadeAnim,
          {toValue: 0.8+val}
        ).start();
        Animated.spring(
          this.state.enter,
          { toValue: 0.8+val, friction: 7 }
        ).start();
        Animated.event([
          null, {dx: this.state.pan.x},
        ])(e, gestureState)
      },

      onPanResponderRelease: (e, {vx, vy}) => {
        if(this.props.onSwiping)
          this.props.onSwiping(null);
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 4.5, 10);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 4.5, 10) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          if (velocity>0) {
            (this.props.onSwipeRight) ? this.props.onSwipeRight(this.state.selectedItem) : undefined;
            this.selectNext();
          } else {
            (this.props.onSwipeLeft) ? this.props.onSwipeLeft(this.state.selectedItem) : undefined;
            this.selectNext();
          }

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0.8);
    this.state.fadeAnim.setValue(0.8);
    this.setState({
      card1Top: !this.state.card1Top,
      card2Top: !this.state.card2Top
    });
    if(this.props.onSwiping)
      this.props.onSwiping(null);

  }

  getCardStyles() {

    let { pan, pan2, enter } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];
    // let [translateX, translateY] = [pan2.x, pan2.y];

    let rotate = pan.x.interpolate({inputRange: [-700, 0, 700], outputRange: ['-10deg', '0deg', '10deg']});

    let opacity = pan.x.interpolate({inputRange: [-320, 0, 320], outputRange: [0.9, 1, 0.9]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}], opacity};
    let animatedCardStyles2 = {transform: [{scale}]};

    return [animatedCardStyles, animatedCardStyles2]
  }

  render() {
  	if(this.state.disabled) {
  		return(
	      <View ref={c => this._root = c} style={{position: 'relative', flexDirection: 'column'}}>
	      	{
	      		<View>
	      		{
	      		  this.props.renderEmpty()
	      		}
	      		</View>
	      	}
	      </View>
  		);
  	} else if(this.state.lastCard) {
	    return(
	      <View ref={c => this._root = c} style={{position: 'relative', flexDirection: 'column'}}>
	      	{
	      		(this.state.selectedItem) === undefined ? this.props.renderEmpty() :
	      		(
							<View>
								<Animated.View style={[this.getCardStyles()[1], this.getInitialStyle().topCard, {opacity: this.state.fadeAnim}]} {...this._panResponder.panHandlers}>
								  {
								  	this.props.renderEmpty()
								  }
								</Animated.View>
							  <Animated.View style={[ this.getCardStyles()[0], this.getInitialStyle().topCard] } {...this._panResponder.panHandlers} >
								  {
								  	this.props.renderItem(this.state.selectedItem)
								  }
							  </Animated.View>
							</View>
						)
	      	}
	      </View>
	    );
  	} else {
	    return(
	      <View ref={c => this._root = c} style={{position: 'relative', flexDirection: 'column'}}>
	      	{
	      		(this.state.selectedItem) === undefined ? this.props.renderEmpty() :
	      		(
							<View>
							  <Animated.View style={[this.getCardStyles()[1], this.getInitialStyle().topCard, {opacity: this.state.fadeAnim}]} {...this._panResponder.panHandlers}>
							    {
							    	this.props.renderItem(this.state.selectedItem2)
							    }
							  </Animated.View>
							  <Animated.View style={[ this.getCardStyles()[0], this.getInitialStyle().topCard] } {...this._panResponder.panHandlers} >
								  {
								  	this.props.renderItem(this.state.selectedItem)
								  }
							  </Animated.View>
							</View>
						)
	      	}
	      </View>
	    );
  	}
  }

}

DeckSwiper.propTypes = {
  ...View.propTypes,
  style: React.PropTypes.object,
  dataSource: React.PropTypes.array,
};
