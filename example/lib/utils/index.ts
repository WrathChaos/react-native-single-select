import Fuse from "fuse.js";

export const filterBySearch = (searchText: string, list: any) => {
  if (searchText.length == 0) return list;
  const options = {
    isCaseSensitive: false,
    threshold: 0.3,
    keys: ["value"],
  };
  const fuse = new Fuse(list, options);
  return fuse.search(searchText).map((element) => {
    return element.item;
  });
};
