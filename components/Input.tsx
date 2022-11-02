interface Props {
  input: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
  };
}

export default function Input({ input }: Props) {
  return (
    <div>
      <label htmlFor={input.name}>{input.label}</label>
      <input
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
      />
    </div>
  );
}
