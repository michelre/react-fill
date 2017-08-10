import R from 'ramda';

export const getRandoms = (nbRandoms, end, acc = []) => {
  const number = Math.floor((Math.random() * end));
  const foundNumber = R.find(n => n === number, acc);
  if(nbRandoms === 0) return R.sort((a, b) => a - b, acc);
  if(foundNumber === undefined) return getRandoms(nbRandoms - 1, end, R.union(acc, [number]));
  return getRandoms(nbRandoms, end, acc);
}

export const findNextKey = (allKeys, completeKeys) => {
  const differenceWithCompleteKeys = R.difference(allKeys, completeKeys);
  if(differenceWithCompleteKeys.length === 0) return null;
  const nextKeyIdx = R.lastIndexOf(R.last(completeKeys), allKeys) + 1
  const nextKey = allKeys[nextKeyIdx];
  if(!nextKey && differenceWithCompleteKeys.length > 0) {
    return allKeys[0];
  }
  return nextKey
}

export const isPunctuationChar = (char) => {
  const reg = /,|\.|!|\?|\"/;
  return reg.test(char);
}

export const completeWhilePunctuation = (nextTokens, str = '') => {
  const nextToken = nextTokens[0];
  if(!isPunctuationChar(nextToken)) return str;
  return completeWhilePunctuation(R.takeLast(nextTokens.length - 1, nextTokens), `${str}${nextToken}`)
}
