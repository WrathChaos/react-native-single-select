import * as React from "react";
import { Animated, Easing, ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
/**
 * ? Local Imports
 */
import { DARK } from "../theme";
// ? Assets
import defaultLightIconImage from "./down-arrow-light.png";
import defaultDarkIconImage from "./down-arrow-dark.png";


interface IProps {
  theme: string;
  style?: StyleProp<ImageStyle>;
  iconImageSource?: any;
}

interface IState {
  toggled: boolean;
  rotation: Animated.Value;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      toggled: false,
      rotation: new Animated.Value(0),
    };
  }

  onPressAnimation = () => {
    const { rotation, toggled } = this.state;
    this.setState({ toggled: !this.state.toggled })
    Animated.timing(rotation, {
      toValue: toggled ? 0 : 1,
      duration: 850,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { style, iconImageSource, ...other } = this.props;
    const rotate = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });
    return (
      <Animated.Image
        {...other}
        source={
          iconImageSource ||
          (this.props.theme === DARK
            ? defaultLightIconImage
            : defaultDarkIconImage)
        }
        style={[style, { transform: [{ rotate }] }]}
      />
    );
  }
}

export default Icon;
