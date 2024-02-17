import React from 'react';
import {Chip, ChipProps, Colors} from 'react-native-ui-lib';

type StatusChipsProps = {
  type: 'primary' | 'success' | 'warning' | 'danger';
} & ChipProps;

const chipProps: Record<StatusChipsProps['type'], ChipProps> = {
  success: {
    labelStyle: {
      color: Colors.$textSuccess,
      fontWeight: 'bold',
    },
    backgroundColor: Colors.green80,
    containerStyle: {borderColor: Colors.$textSuccessLight},
  },
  warning: {
    labelStyle: {
      color: Colors.yellow10,
      fontWeight: 'bold',
    },
    backgroundColor: Colors.yellow80,
    containerStyle: {borderColor: Colors.yellow10},
  },
  danger: {
    labelStyle: {
      color: Colors.$textDanger,
      fontWeight: 'bold',
    },
    backgroundColor: Colors.red80,
    containerStyle: {borderColor: Colors.$textDangerLight},
  },
  primary: {
    labelStyle: {
      color: Colors.$textPrimary,
      fontWeight: 'bold',
    },
    backgroundColor: Colors.$bgPrimaryLight,
    containerStyle: {borderColor: Colors.$textPrimaryLight},
  },
};

const StatusChips = ({type, ...rest}: StatusChipsProps) => {
  return <Chip {...chipProps[type]} {...rest} />;
};

export default StatusChips;
