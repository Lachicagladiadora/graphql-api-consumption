import { CountrySchema } from "../../inner/types";

type CountryProps = { currentCountry: CountrySchema };

export const Country = ({ currentCountry }: CountryProps) => {
  return (
    <div className="country-wrapper">
      <h3 className="country-title">
        <span>{currentCountry.emoji}</span>
        <span>
          {currentCountry.name} ({currentCountry.code})
        </span>
      </h3>
      {currentCountry.capital && (
        <div>
          <span className="feature">ꚰ Capital: </span> {currentCountry.capital}
        </div>
      )}
      <div>
        <span className="feature">𖡡 Continent: </span>
        {currentCountry.continent.name} ({currentCountry.continent.code})
      </div>
      <div>
        <span className="feature">✆ Phone code:</span> + {currentCountry.phone}
      </div>
      <div className="wrapper-languages">
        <span className="feature">🄰 Language: </span>{" "}
        <div className="languages">
          {currentCountry.languages.map((c, i) => (
            <span className="language" key={i}>
              {c.name} ({c.native})
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="feature">⛁ Currency: </span> {currentCountry.currency}
      </div>
      <div>
        <span className="feature"> Subdivisions: </span>{" "}
        {currentCountry.subdivisions.length}
      </div>
    </div>
  );
};
