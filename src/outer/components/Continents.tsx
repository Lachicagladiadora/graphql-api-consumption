import { ContinentData } from "../../inner/types";
import { Country } from "./Country";

type ContinentsProps = { allContinents: ContinentData[] };

export const Continents = ({ allContinents }: ContinentsProps) => {
  return (
    <div>
      {Boolean(!allContinents.length) && <p>... Loading</p>}
      {Boolean(allContinents.length) &&
        allContinents.map((c, i) => (
          <div key={i}>
            {Boolean(c.countries.length) && (
              <>
                <h2 className="continent-title">{c.name}</h2>
                <div key={c.code} className="countries-wrapper">
                  {c.countries.map((cur, idx) => (
                    <Country key={idx} currentCountry={cur} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};
