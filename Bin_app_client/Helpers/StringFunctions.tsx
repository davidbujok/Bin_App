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
