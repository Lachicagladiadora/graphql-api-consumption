import { useEffect, useState } from "react";
import { Countries, Country } from "../inner/types";
import { DATA } from "../inner/constants";

const country1 = DATA.countries[30];
const country6 = DATA.countries[189];
const country5 = DATA.countries[123];
const country4 = DATA.countries[230];

function App() {
  const [resultCountries, setResultCountries] = useState<Countries>([]);
  const [filterBy, setFilterBy] = useState<"continent" | "language">(
    "continent"
  );

  useEffect(() => {
    setResultCountries([country1, country4, country5, country6]);
  }, []);

  return (
    <>
      <h1>Country Search</h1>
      <section className="searcher-wrapper">
        Some random text
        <div className="input-wrapper">
          <div className="icon">⚲</div>
          <input className="input-search" type="text" placeholder="" />
        </div>
      </section>
      <section className="buttons-wrapper">
        <h2>Group by:</h2>
        <button
          onClick={() => setFilterBy("continent")}
          style={{
            background: filterBy === "continent" ? "#00796b" : "transparent",
            color: filterBy === "continent" ? "#fff" : "#898989",
          }}
        >
          Continent
        </button>
        <button
          onClick={() => setFilterBy("language")}
          style={{
            background: filterBy === "language" ? "#00796b" : "transparent",
            color: filterBy === "language" ? "#fff" : "#898989",
          }}
        >
          Language
        </button>
      </section>
      {Boolean(!resultCountries.length) && <p>not results</p>}
      {Boolean(resultCountries.length) && (
        <section className="countries-wrapper">
          {resultCountries.map((c, i) => (
            <div key={i} className="country-wrapper">
              <h2>
                <span style={{ fontWeight: "normal" }}>✉︎</span>
                {c.name ?? ""}
              </h2>
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
