import React, {memo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const Backdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />
  );
};

export default memo(Backdrop);
