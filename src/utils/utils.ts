export function shortName(name: string) {
  const wordList = name.split(" ");
  return wordList[0][0] + wordList[wordList.length - 1][0];
}