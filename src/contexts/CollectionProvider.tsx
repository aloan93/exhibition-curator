import { createContext, useState } from "react";

type collectionType = { collection: string; id: number }[];

const collectionContextDefault = {
  collection: [] as collectionType,
  setCollection: (_collection: collectionType) => {},
};

const CollectionContext = createContext(collectionContextDefault);

function CollectionProvider(props: { children: any }) {
  const [collection, setCollection] = useState(
    collectionContextDefault.collection
  );

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {props.children}
    </CollectionContext.Provider>
  );
}

export { CollectionContext, CollectionProvider };
