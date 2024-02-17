import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useBottomSheetBack} from './useBottomSheetBack';
import Backdrop from './Backdrop';
import {StyleSheet} from 'react-native';

type CustomBottomSheetProps = {
  visible: boolean;
  snapPoints?: BottomSheetProps['snapPoints'];
  children: ReactNode;
  onClose: () => void;
};
const BottomSheet = ({
  visible,
  onClose,
  snapPoints = ['50%'],
  children,
}: CustomBottomSheetProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(visible);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useBottomSheetBack(bottomSheetOpen, bottomSheetRef, () =>
    setBottomSheetOpen(false),
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        console.log('handleSheetChanges', index);
        setBottomSheetOpen(false);
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    setBottomSheetOpen(visible);
  }, [visible]);

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [bottomSheetOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      animateOnMount
      onChange={handleSheetChanges}
      backdropComponent={Backdrop}>
      <BottomSheetScrollView style={styles.bottomSheetView}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    padding: 12,
  },
});

export default BottomSheet;
