export const getActive = (activeBranch: any, listId: string) =>
  activeBranch.find((item: any) => item === listId);

// This walks the tree and builds a path to the active nested page
// taken from https://www.techighness.com/post/javascript-find-key-path-in-deeply-nested-object-or-array/
export const buildPathFromTree = (ob: any, key: any, value: any) => {
  const path = [] as any[];
  // @ts-ignore
  const keyExists = (obj: any) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      // the meat of it happens here for when each level the conidtions have been met,
      // we push the index and its key into the path.
      for (let i = 0; i < obj.length; i++) {
        path.push(obj[i].id);
        // @ts-ignore
        const result = keyExists(obj[i], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    } else {
      for (const k in obj) {
        path.push(k);
        // @ts-ignore
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }

    return false;
  };

  keyExists(ob);
  return path;
};
