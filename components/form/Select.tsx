import { useFormContext } from "react-hook-form";
interface Props {
  input: {
    name: string;
    label: string;
    placeholder: string;
    options: Array<{ value: string; text: string }>;
  };
  className?: string;
}

export default function Select({ input, className }: Props) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();
  return (
    <div className="select-view">
      <label htmlFor={input.name}>{input.label}</label>
      <select
        name={input.name}
        className={className}
        placeholder={input.placeholder}
        {...register(input.name)}
      >
        {input.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <p className="text-red-500 p-0  text-xs">{errors[input.name]?.message}</p>
    </div>
  );
}
