import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default ({setPickedDate, open, setOpen}) => {
  const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)
  console.log("Here")
  
  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          date.setHours(date.getHours()+1)
          setPickedDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}