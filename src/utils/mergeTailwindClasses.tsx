function mergeTailwindClasses(...classStrings: (string | undefined | null)[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const classHash: any = {};
  classStrings
    .filter((classNameString) => classNameString && classNameString.length > 0)
    .map((str) => {
      str &&
        str.split(/\s+/g).map((token: string) => {
          classHash[token.split('-')[0]] = token;
        });
    });
  return Object.values(classHash).sort().join(' ');
}

export default mergeTailwindClasses;
