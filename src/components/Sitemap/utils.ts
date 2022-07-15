import { IPageTree } from '../../types/types';

export const getActive = (activeBranch: string[], listId: string) =>
  activeBranch.find((item: string) => item === listId);

// This walks the tree and builds a path to the active nested page
// taken from https://www.techighness.com/post/javascript-find-key-path-in-deeply-nested-object-or-array/
export const buildPathFromTree = (data: IPageTree[], key: string, value: string) => {
  const path = [] as string[];

  const keyExists = (obj: IPageTree | string | null, noopKey?: string): string | boolean => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key) && (obj as any)[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      // the main bit happens here for when the conditions are met for each level,
      // we push the id we're currently on until we get to the leaf active id.
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
        const result = keyExists((obj as any)[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }

    return false;
  };

  keyExists(data as unknown as IPageTree);
  return path;
};
