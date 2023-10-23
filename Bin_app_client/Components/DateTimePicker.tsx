import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { handleNotification } from './NotificationFunctionality'

export default ({ open, setOpen, calendarDate}) => {
  
  const [date, setDate] = useState<Date>(new Date())
  let previousDay: Date | null = null
  
  if(calendarDate!= null){
    const splitedDate = calendarDate.date.split("-")
    
    let getYear = splitedDate[0]
    let getMonth = splitedDate[1]
    let getDay = splitedDate[2]

    const year:number = Number(getYear)
    const month:number = Number(getMonth)-1
    const day:number = Number(getDay-1)
    previousDay = new Date(year,month,day,21)
  }

  return (
    <>
      
      <DatePicker
        modal
        open={open}
        date={calendarDate!= null ? previousDay :date}
        onConfirm={(date) => {
          setOpen(false)
          date.setHours(date.getHours())
          handleNotification(calendarDate,date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}