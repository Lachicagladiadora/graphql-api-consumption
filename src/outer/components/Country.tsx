import { CountrySchema } from "../../inner/types";

type CountryProps = { currentCountry: CountrySchema };

export const Country = ({ currentCountry }: CountryProps) => {
  return (
    <div className="country-wrapper">
      <h2 className="country-title">
        <span>{currentCountry.emoji}</span>
        <span>
          {currentCountry.name} ({currentCountry.code})
        </span>
      </h2>
      {currentCountry.capital && <div>𖥔 {currentCountry.capital}</div>}
      <div>
        ⌖ {currentCountry.continent.name} ({currentCountry.continent.code})
      </div>
      <div>✆ {currentCountry.phone}</div>
      <div className="wrapper-languages">
        🅰︎{" "}
        <div className="languages">
          {currentCountry.languages.map((c, i) => (
            <span className="language" key={i}>
              {c.name} ({c.native})
            </span>
          ))}
        </div>
      </div>
      <div>Subdivisions: {currentCountry.subdivisions.length}</div>
    </div>
  );
};
