import { useEffect, useState } from "react";
import { Countries } from "../inner/types";
import { DATA } from "../inner/constants";

const country1 = DATA.countries[30];
const country6 = DATA.countries[189];
const country5 = DATA.countries[123];
const country4 = DATA.countries[230];

function App() {
  const [resultCountries, setResultCountries] = useState<Countries>([]);

  useEffect(() => {
    setResultCountries([country1, country4, country5, country6]);
  }, []);

  return (
    <>
      <h1>Country Search</h1>
      <section>
        Some random text
        <input type="text" placeholder="" />
      </section>
      <section>
        <h2>Group by:</h2>
        <button>Continent</button>
        <button>Language</button>
      </section>
      {Boolean(resultCountries.length) && <p>not results</p>}
      {Boolean(resultCountries.length) && (
        <section>
          {resultCountries.map((c, i) => (
            <div key={i}>
              <h2>✉️{c.name ?? ""}</h2>
              <div>{c.code ?? ""}</div>
              {c.capital && <div>{c.capital ?? ""}</div>}
              <div>{c.continent.name}</div>
              {c.currency && <div>{c.currency ?? ""}</div>}
              <div>{c.emoji}</div>
              <div>
                (
                {c.languages.map((c, i) => (
                  <span
                    key={i}
                    style={{ fontWeight: c.native ? "bold" : "normal" }}
                  >
                    {c.name}
                  </span>
                ))}
                )
              </div>
              <div>{c.phone}</div>
              <div>{c.phone}</div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default App;
