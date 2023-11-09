export  const capitaliseFirstLetter = (array: string[]) => {
    const capitaliseLetter: string[]= [];
    array.forEach(word => {
        if(word.charAt(0)=="e" && word.charAt(1)=="h")
        {
        return capitaliseLetter.push(word.charAt(0).toUpperCase() + word.charAt(1).toUpperCase() + word.slice(2))
        }else
        {
        return capitaliseLetter.push(word.charAt(0).toUpperCase() + word.slice(1))
        }
    })
    return capitaliseLetter
  } 
