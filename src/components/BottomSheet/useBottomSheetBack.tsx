import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export const useBottomSheetBack = (
  bottomSheetOpen: boolean,
  bottomSheetModalRef?: React.RefObject<BottomSheetModal>,
  onClose?: () => void,
) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (bottomSheetOpen && bottomSheetModalRef?.current) {
          bottomSheetModalRef?.current?.close();
          onClose?.();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [bottomSheetModalRef, bottomSheetOpen, onClose]),
  );
};
