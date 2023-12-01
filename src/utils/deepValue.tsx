const deepValue = (obj: any, path: string) => {
  return path.split('.').reduce((o, p) => o && o[p], obj);
};

export default deepValue;
