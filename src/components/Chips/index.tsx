import React, {Key} from 'react';
import {Chip, Colors, View, ViewProps} from 'react-native-ui-lib';
import {PressableScale} from '../PressableScale';

type ChipsProps = {
  options: {value: Key; label: string}[];
  values: Key | null;
  onChanges?: (value: Key | null) => void;
  style?: ViewProps['style'];
};

const Chips = (props: ChipsProps) => {
  const {values, options, style, onChanges} = props;

  return (
    <View style={style}>
      {options.map(option => {
        const selected = values === option.value;
        return (
          <PressableScale
            key={option.value}
            onPress={() => {
              onChanges?.(option.value === values ? null : option.value);
            }}>
            <Chip
              label={option.label}
              containerStyle={{
                borderColor: selected ? Colors.blue40 : Colors.grey20,
              }}
              backgroundColor={selected ? Colors.blue70 : Colors.grey70}
              labelStyle={{
                color: selected ? Colors.$textPrimary : Colors.$textDefault,
              }}
            />
          </PressableScale>
        );
      })}
    </View>
  );
};

export default Chips;
