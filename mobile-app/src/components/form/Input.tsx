import { Text, TextInput, View, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  label: string;
  className?: string;
  error?: { value: boolean; message?: string };
};

export default function Input({
  label,
  error = { value: false },
  className = "",
  ...props
}: InputProps) {
  let inputClasses = `rounded-md py-2 px-3 border border-gray-300 text-darkText focus:outline-none focus:ring-0 focus:border-gray-500 ${className}`;

  return (
    <View className="flex flex-col mt-2 w-full">
      <Text className="uppercase font-semibold mb-1 text-darkText">
        {label}
      </Text>
      <TextInput className={inputClasses} {...props} autoCapitalize="none" />
      {error.value && error.message && (
        <Text className="text-red-500">{error.message}</Text>
      )}
    </View>
  );
}
