/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepValue = (obj: any, path: string) => {
    path.split('.').reduce((o, p) => o && o[p], obj);
  };