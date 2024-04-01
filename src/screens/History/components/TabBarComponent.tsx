import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view';
import {Colors} from 'react-native-ui-lib';

type TabBarComponentProps = SceneRendererProps & {
  navigationState: NavigationState<any>;
  onChageIndex: (index: number) => void;
};

const TabBarComponent = (props: TabBarComponentProps) => {
  const inputRange = props.navigationState.routes.map((x, i) => i);

  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        const active = props.navigationState.index === i;
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex =>
            inputIndex === i ? 1 : 0.5,
          ),
        });

        return (
          <TouchableOpacity
            key={i}
            style={[styles.tabItem]}
            onPress={() => props.onChageIndex(i)}>
            <Animated.Text
              numberOfLines={1}
              style={[{opacity}, active && styles.text]}>
              {route.title}
            </Animated.Text>
            {active && <View style={styles.bottomLine} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.$backgroundDefault,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  bottomLine: {
    backgroundColor: Colors.$backgroundGeneralHeavy,
    height: 3,
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 0,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.blue40,
  },
});

export default memo(TabBarComponent);
