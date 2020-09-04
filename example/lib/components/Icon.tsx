import * as React from "react";
import { Animated, Easing, ImageStyle } from "react-native";
// ? Assets
import defaultIconImage from "./down-arrow.png";

export type Source = {
  uri?: string;
};

interface IProps {
  style?: ImageStyle;
  iconImageSource?: Source | number;
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
    Animated.timing(rotation, {
      toValue: toggled ? 0 : 1,
      duration: 850,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() => this.setState({ toggled: !this.state.toggled }));
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
        source={iconImageSource || defaultIconImage}
        style={[style, { transform: [{ rotate }] }]}
      />
    );
  }
}

export default Icon;
