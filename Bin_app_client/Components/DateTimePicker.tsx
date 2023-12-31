import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {handleNotification} from './NotificationFunctionality';

export default ({open, setOpen, calendarDate: iDate, datePicked}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = useState<Date>(new Date());
  let previousDay: Date;

  if (iDate != null) {
    previousDay = new Date(Number(iDate.dateObject));
    previousDay.setDate(iDate.dateObject.getDate() - 1);

    // previousDay = new Date(year, month, day, 21);
  } else {
    // emergency: yesterday
    previousDay = new Date(new Date().setDate(new Date().getDate() - 1));
  }
  //   TODO: trying to remove the date crash
  previousDay = new Date(Date.now());

  return (
    <>
      <DatePicker
        modal
        open={open}
        date={previousDay}
        // date={iDate === null ? previousDay : iDate.date}
        onConfirm={
          dateReminder => {
          setOpen(false);
          dateReminder.setHours(dateReminder.getHours());
          datePicked(dateReminder);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
