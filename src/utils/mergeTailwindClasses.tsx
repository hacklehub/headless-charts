function mergeTailwindClasses(...classStrings: (string | undefined)[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const classHash: any = {};
  classStrings.map((str) => {
    str &&
      str.split(/\s+/g).map((token: string) => {
        classHash[token.split('-')[0]] = token;
      });
  });
  return Object.values(classHash).sort().join(' ');
}

export default mergeTailwindClasses;
