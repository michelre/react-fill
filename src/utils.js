import R from 'ramda';

export const getRandoms = (nbRandoms, end, acc = []) => {
  if(nbRandoms === 0) return R.sort((a, b) => a -b, acc);
  const number = Math.floor((Math.random() * end) + 1);
  const foundNumber = R.find(n => n === number, acc);
  if(!foundNumber) return getRandoms(nbRandoms - 1, end, R.union(acc, [number]));
  return getRandoms(nbRandoms, end, acc);
}

export const findNextKey = (allKeys, currentKey, completeKeys) => {
  const differenceWithCompleteKeys = R.difference(allKeys, completeKeys);
  if(differenceWithCompleteKeys.length === 0) return null;
  const nextKey = allKeys[allKeys.indexOf(currentKey) + 1];
  if(!nextKey && differenceWithCompleteKeys.length > 0) {
    return allKeys[0];
  }
  return nextKey
}
