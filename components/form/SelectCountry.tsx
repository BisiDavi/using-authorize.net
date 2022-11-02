import { useFormContext } from "react-hook-form";

import countries from "../../json/countries.json";

export default function SelectCountry() {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();
  return (
    <div className="select-view">
      <label htmlFor="country">Select your country</label>
      <select placeholder="Select your country" {...register("country")}>
        <option value="">Select your country</option>
        {countries.map((option: any) => (
          <option key={option.Iso3} value={option.Iso3}>
            {option.name}
          </option>
        ))}
      </select>
      <p>{errors["country"]?.message}</p>
    </div>
  );
}
