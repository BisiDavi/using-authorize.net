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
  return (
    <div className="input-view">
      <label htmlFor={input.name}>{input.label}</label>
      <input
        name={input.name}
        type={input.type}
        className={className}
        placeholder={input.placeholder}
      />
    </div>
  );
}
