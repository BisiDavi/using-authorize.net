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
  return (
    <div className="select-view">
      <label htmlFor={input.name}>{input.label}</label>
      <select
        name={input.name}
        className={className}
        placeholder={input.placeholder}
      >
        {input.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
