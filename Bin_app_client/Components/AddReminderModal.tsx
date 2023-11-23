import React from 'react';
import {Dimensions, Image, Modal, Pressable, View} from 'react-native';
import {styles} from '../styles/stylesSheet';
import RemindersScreen from './RemindersScreen';

const AddReminderModal = ({
  modalRemindersVisible,
  setModalRemindersVisible,
  pickupDayInfo,
  pagesForNextMonths,
  setHasReminders,
  openDateTimePicker,
  dates,
  setOpenDateTimePicker,
}) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalRemindersVisible}
      onRequestClose={() => {
        setModalRemindersVisible(!modalRemindersVisible);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {minHeight: SCREEN_HEIGHT * 0.4, maxHeight: SCREEN_WIDTH * 0.4},
          ]}>
          <Pressable
            onPress={() => setModalRemindersVisible(!modalRemindersVisible)}>
            <Image
              style={styles.modalCloseX}
              source={require('../static/images/cancel_grey.png')}></Image>
          </Pressable>
          <RemindersScreen
            openDateTimePicker={openDateTimePicker}
            setOpenDateTimePicker={setOpenDateTimePicker}
            date={pickupDayInfo}
            datesList={pagesForNextMonths(dates)}
            setHasReminders={setHasReminders}
            closeParent={setModalRemindersVisible}></RemindersScreen>
        </View>
      </View>
    </Modal>
  );
};

export default AddReminderModal;
