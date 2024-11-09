import Radio from "./Radio.jsx";

export default function RadioGroup({ options, name }) {
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
