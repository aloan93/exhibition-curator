import { createContext, useState } from "react";

type exhibitionType = { collection: string; id: number }[];

const exhibitionContextDefault = {
  exhibition: [] as exhibitionType,
  setExhibition: (_exhibition: exhibitionType) => {},
};

const ExhibitionContext = createContext(exhibitionContextDefault);

function ExhibitionProvider(props: { children: any }) {
  const [exhibition, setExhibition] = useState(
    exhibitionContextDefault.exhibition
  );

  return (
    <ExhibitionContext.Provider value={{ exhibition, setExhibition }}>
      {props.children}
    </ExhibitionContext.Provider>
  );
}

export { ExhibitionContext, ExhibitionProvider };
