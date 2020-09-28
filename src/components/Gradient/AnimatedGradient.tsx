import React, { Component, PureComponent, ReactText } from 'react';
import { StyleSheet, Animated, ViewStyle } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});

function shallowEqual(
  object1: Record<string, any>,
  object2: Record<string, any>
) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

type GradientHelperProps = {
  startY: number;
  startX: number;
  endX: number;
  endY: number;
  angle?: number;
  angleCenterX?: number;
  angleCenterY?: number;
  style?: ViewStyle;
};

class GradientHelper extends PureComponent<GradientHelperProps> {
  _generateColorsArray(props: Record<string, any>) {
    const propsKeys = Object.keys(props);
    const colorsArray = [] as string[];

    propsKeys.forEach((key) => {
      if (
        key.indexOf('animatedColor') !== -1 &&
        props[key] &&
        typeof props[key] === 'string'
      ) {
        colorsArray.push(props[key]);
      }
    });

    return colorsArray;
  }

  _generateLocationsArray(props: Record<string, any>) {
    const propsKeys = Object.keys(props);
    const locationArray = [] as number[];

    propsKeys.forEach((key) => {
      if (
        key.indexOf('location') !== -1 &&
        props[key] &&
        typeof props[key] === 'number'
      ) {
        locationArray.push(props[key]);
      }
    });

    return locationArray.length ? locationArray : undefined;
  }

  render() {
    const {
      style,
      startX,
      startY,
      endX,
      endY,
      angle,
      angleCenterX,
      angleCenterY,
      ...rest
    } = this.props;
    const colors = this._generateColorsArray(this.props);
    const locations = this._generateLocationsArray(this.props);

    return (
      <LinearGradient
        {...rest}
        colors={colors}
        locations={locations}
        angle={angle}
        angleCenter={
          (angleCenterX || angleCenterY
            ? { x: angleCenterX, y: angleCenterY }
            : undefined) as any
        }
        start={{
          x: startX,
          y: startY,
        }}
        end={{
          x: endX,
          y: endY,
        }}
        style={style}
      />
    );
  }
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

type Props = LinearGradientProps & {
  animationConfig?: {
    easing?: (value: number) => number;
    duration?: number;
    delay?: number;
  };
};

type State = {
  prevColors: LinearGradientProps['colors'];
  colors: LinearGradientProps['colors'];
  prevOrientation: {
    start: LinearGradientProps['start'];
    end: LinearGradientProps['end'];
  };
  orientation: {
    start: LinearGradientProps['start'];
    end: LinearGradientProps['end'];
  };
  angle: {
    angle: LinearGradientProps['angle'];
    angleCenter: LinearGradientProps['angleCenter'];
  };
  prevAngle: {
    angle: LinearGradientProps['angle'];
    angleCenter: LinearGradientProps['angleCenter'];
  };
  locations: LinearGradientProps['locations'];
  prevLocations: LinearGradientProps['locations'];

  tweener: Animated.Value;
};

export default class AnimatedGradient extends Component<Props, State> {
  static defaultProps = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    animationConfig: { duration: 150 },
  };

  constructor(props: Props) {
    super(props);

    const { colors, start, end, locations, angleCenter, angle } = props;
    this.state = {
      prevColors: colors,
      prevOrientation: { start, end },
      colors,
      prevLocations: locations,
      locations,
      prevAngle: { angle, angleCenter },
      angle: { angle, angleCenter },
      tweener: new Animated.Value(0),
      orientation: { start, end },
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const {
      colors: prevColors,
      locations: prevLocations,
      orientation: prevOrientation,
      angle: prevAngle,
    } = state;
    const { colors, start, end, locations, angle, angleCenter } = props;
    return {
      prevColors,
      prevOrientation,
      colors,
      prevLocations,
      prevAngle,
      angle: { angle, angleCenter },
      locations,
      orientation: { start, end },
      tweener: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state.tweener, {
      toValue: 1,
      useNativeDriver: false,
      ...this.props.animationConfig,
    }).start();
  }

  render() {
    const {
      prevColors,
      tweener,
      prevOrientation,
      colors,
      prevLocations,
      prevAngle,
      angle,
      locations,
      orientation,
    } = this.state;

    const { style } = this.props;

    let newColors =
      prevColors && colors
        ? colors.map((color, index) => {
            return tweener.interpolate({
              inputRange: [0, 1],
              outputRange: [prevColors[index], color] as string[],
            });
          })
        : colors;

    const newLocations =
      prevLocations && locations
        ? locations.map((location, index) =>
            tweener.interpolate({
              inputRange: [0, 1],
              outputRange: [prevLocations[index], location],
            })
          )
        : [];

    const locationsMapped = {} as Record<string, any>;

    newLocations.forEach((location, index) => {
      locationsMapped['location' + index] = location;
    });

    let colorsMapped = {} as Record<string, any>;

    newColors.forEach(
      // @ts-ignore
      (color: Animated.AnimatedInterpolation, index: number) => {
        colorsMapped['animatedColor' + index] = color;
      }
    );

    const angleProp =
      prevAngle.angle !== angle.angle
        ? tweener.interpolate({
            inputRange: [0, 1],
            outputRange: [
              prevAngle.angle as ReactText,
              angle.angle as ReactText,
            ] as string[],
          })
        : angle.angle;

    const angleCenterProps =
      prevAngle.angleCenter &&
      angle.angleCenter &&
      shallowEqual(prevAngle.angleCenter, angle.angleCenter)
        ? {
            x: tweener.interpolate({
              inputRange: [0, 1],
              outputRange: [prevAngle.angleCenter.x, angle.angleCenter.x],
            }),
            y: tweener.interpolate({
              inputRange: [0, 1],
              outputRange: [prevAngle.angleCenter.y, angle.angleCenter.y],
            }),
          }
        : angle.angleCenter;

    // orientation interpolations

    const startXinterp = tweener.interpolate({
      inputRange: [0, 1],
      // @ts-ignore
      outputRange: [prevOrientation.start.x, orientation.start.x],
    });

    const startYinterp = tweener.interpolate({
      inputRange: [0, 1],
      // @ts-ignore
      outputRange: [prevOrientation.start.y, orientation.start.y],
    });

    const endXinterp = tweener.interpolate({
      inputRange: [0, 1],
      // @ts-ignore
      outputRange: [prevOrientation.end.x, orientation.end.x],
    });

    const endYinterp = tweener.interpolate({
      inputRange: [0, 1],
      // @ts-ignore
      outputRange: [prevOrientation.end.y, orientation.end.y],
    });

    return (
      <AnimatedGradientHelper
        style={style || styles.component}
        {...colorsMapped}
        {...locationsMapped}
        startX={startXinterp}
        startY={startYinterp}
        endX={endXinterp}
        angle={angleProp}
        angleCenterX={angleCenterProps?.x}
        angleCenterY={angleCenterProps?.y}
        endY={endYinterp}
      />
    );
  }
}
