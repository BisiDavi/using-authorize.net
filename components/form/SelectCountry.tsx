import countries from "../../json/countries.json";

export default function SelectCountry() {
  return (
    <div className="select-view">
      <label htmlFor="country">Select your country</label>
      <select name="country" placeholder="Select your country">
        {countries.map((option: any) => (
          <option key={option.Iso3} value={option.Iso3}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
