export const getSearchParamsObject=(searchParams)=> {
  const paramsObject = {};
  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }
  return paramsObject;
}
