export const writeToUrl = (varName: string, val: string) => {
  const newUrl = new URL(location.toString());
  newUrl.searchParams.set(varName, val);
  if (val === "") newUrl.searchParams.delete(varName);
  history.pushState({}, "", newUrl);
};
