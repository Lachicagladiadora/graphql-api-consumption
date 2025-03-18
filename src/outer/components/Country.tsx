import { CountryData } from "../../inner/types";

type CountryProps = { currentCountry: CountryData };

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
      <div>⌖ {currentCountry.continent.name}</div>
      <div className="wrapper-languages">
        🅰︎{" "}
        {currentCountry.languages.map((c, i) => (
          <span key={i}>{c.name}</span>
        ))}
      </div>
      <div>✆ {currentCountry.phone}</div>
    </div>
  );
};
