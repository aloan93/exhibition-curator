import { createContext, useState } from "react";

const ExhibitionContext = createContext({});

function ExhibitionProvider(props: { children: any }) {
  type exhibitionType = { collection: string; id: string };
  const [exhibition, setExhibition] = useState<exhibitionType[]>([]);

  return (
    <ExhibitionContext.Provider value={{ exhibition, setExhibition }}>
      {props.children}
    </ExhibitionContext.Provider>
  );
}

export { ExhibitionContext, ExhibitionProvider };
