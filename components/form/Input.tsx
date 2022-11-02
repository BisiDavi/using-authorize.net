import { useFormContext } from "react-hook-form";
interface Props {
  input: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
  };
  className?: string;
}

export default function Input({ input, className }: Props) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();
  return (
    <div className="input-view">
      <label htmlFor={input.name}>{input.label}</label>
      <input
        type={input.type}
        className={className}
        placeholder={input.placeholder}
        {...register(input.name)}
      />
      <p>{errors[input.name]?.message}</p>
    </div>
  );
}
