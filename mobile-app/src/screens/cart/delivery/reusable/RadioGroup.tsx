import Radio from "./Radio";

type RadioGroupProps = {
  options: {
    icon: any;
    price?: string;
    value: string;
    id: string;
    label: string;
  }[];
  name: string;
};

export default function RadioGroup({ options, name }: RadioGroupProps) {
  return (
    <div className="flex flex-col rounded-md border border-formBorder mt-2">
      {options.map((option) => (
        <Radio
          key={option.value}
          id={option.id}
          name={name}
          label={option.label}
          value={option.value}
        >
          {option.icon && <option.icon size={26} className="mr-3" />}
          {option.price}
        </Radio>
      ))}
    </div>
  );
}
