export const capitaliseFirstLetter = (array: string[]) => {
  const capitaliseLetter: string[] = [];
  array.forEach(word => {
    if (word.charAt(0) == 'e' && word.charAt(1) == 'h') {
      return capitaliseLetter.push(
        word.charAt(0).toUpperCase() +
          word.charAt(1).toUpperCase() +
          word.slice(2),
      );
    } else {
      return capitaliseLetter.push(
        word.charAt(0).toUpperCase() + word.slice(1),
      );
    }
  });
  return capitaliseLetter;
};

export const clearEmptyCharacters = (word: string) => {
  return word
    .split(' ')
    .filter(item => item.length > 0)
    .join(' ');
};

export const binTypeToTile = (binTypes: string) => {
  let binNames = binTypes.split(' ');
  // binNames.sort().reverse()
  binNames = capitaliseFirstLetter(binNames);

  if (binNames.length > 3) {
    binNames.sort().reverse().pop();
  }

  // if (binNames.length === 4) {
  //   return `${binNames[0]}, ${binNames[1]} & ${binNames[2]}`
  // }
  if (binNames.length === 3) {
    return `${binNames[0]}, ${binNames[1]} & ${binNames[2]}`;
  }
  if (binNames.length === 2) {
    return `${binNames[0]} & ${binNames[1]}`;
  }
  if (binNames.length === 1) {
    return `${binNames[0]}`;
  }
};

export const dateToString = (date: Date) => {
  const dayOfWeek = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return {
    minute: minute,
    hour: hour,
    day: day,
    dayOfWeek: dayOfWeek,
    month: month,
    year: year,
  };
};

export const homeReminderModalMessage = (message: string = '') => {
  let messageReplaced = message.replace(/collection is on/, '');
  messageReplaced = messageReplaced.replace(/Your/, '');

  messageReplaced = clearEmptyCharacters(messageReplaced);
  let splitMessage = messageReplaced.split(' ');
  let front = splitMessage.splice(-4).join(' ');
  let back = splitMessage.join(' ');

  messageReplaced = front + '\n' + back;
  return clearEmptyCharacters(messageReplaced);
};
