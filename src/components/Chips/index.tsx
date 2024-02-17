import React, {Key} from 'react';
import {Chip, Colors} from 'react-native-ui-lib';
import {PressableScale} from '../PressableScale';

type ChipsProps = {
  options: {value: Key; label: string}[];
  values?: Key[];
  onChanges?: (value: Key[]) => void;
};

const Chips = (props: ChipsProps) => {
  const {values = [], options, onChanges} = props;

  return (
    <>
      {options.map(option => {
        const selected = values?.includes(option.value);
        return (
          <PressableScale
            key={option.value}
            onPress={() => {
              if (selected) {
                onChanges?.(values.filter(value => value !== option.value));
              } else {
                onChanges?.([...values, option.value]);
              }
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
    </>
  );
};

export default Chips;
