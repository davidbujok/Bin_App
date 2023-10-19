import PushNotification from "react-native-push-notification"
import checkApplicationPermission from "../containers/NotificationPermission"
import { IDate } from "../styles/interfaces"

export const handleNotification = async (date: IDate) =>{
    await checkApplicationPermission()
    PushNotification.localNotification({
      channelId:"Date-Notification",
      title: "Reminder Set",
      message: `Congratulations, you have set up a reminder for your bin on ${date.date} `
    })
    const splitedDate = date.date.split("-")
    
    let getYear = splitedDate[0]
    let getMonth = splitedDate[1]
    let getDay = splitedDate[2]

    const year:number = Number(getYear)
    const month:number = Number(getMonth)
    const day:number = Number(getDay)
    console.log(typeof year, typeof month, typeof day)
    console.log(`Year: ${year}, Month: ${month}, Day: ${day}`)


    //Actual Variable (Need hour - minute variable)
    // const setNotification = new Date(year,month-1,day -1 ,hour,minute)


    // Presentation Date Time
    // Need month - 1 because Date month starts from 0 , minutes shouldn't have 0 in front
    // const notificationDate = new Date(year,month-1,19,9,52)
    const notificationDate = new Date(Date.now()+30 * 1000)
    console.log("Notification set for: ", notificationDate)
   

    PushNotification.localNotificationSchedule({
      channelId: "Date-Notification",
      title: `Don't forget to put your bin out`,
      message: `Your ${date.binType} collection is on ${date.date}`,
      date:notificationDate,
      allowWhileIdle:true
    })
  }