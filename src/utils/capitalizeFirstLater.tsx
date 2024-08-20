function titleCase(str: string | undefined = 'undefined') {
  if (str === undefined) return '';

  let splitStr = str.split(' ');

  for (let i = 0; i < splitStr.length; i++) {
    let word = splitStr[i];

    if (word.split('.').length - 1 === 2) {
      continue;
    }

    splitStr[i] =
      word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  }

  return splitStr.join(' ');
}

export default titleCase;
