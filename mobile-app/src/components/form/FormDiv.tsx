import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type FormDivProps = {
  children: ReactNode;
  isSuccess?: boolean;
  error?: { status: number } | null;
  buttonText: string;
  topText: string;
  isValidate?: boolean;
  accountText?: string;
  handleSubmit?: () => void;
  alert?: { msg: string }[];
};

export default function FormDiv({
  children,
  isSuccess = false,
  error = null,
  handleSubmit,
  buttonText,
  topText,
  isValidate = true,
  accountText = "",
  alert,
}: FormDivProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex bg-darkBgMuted p-4 rounded-md shadow-md w-3/4 border-2 border-darkBorder">
        {alert?.map((err) => (
          <Text
            className="text-lg mb-2 text-wrap max-w-96 text-red-500"
            key={err.msg}
          >
            {err.msg}
          </Text>
        ))}
        <Text className="text-center text-3xl text-darkText mb-4 uppercase font-semibold">
          {topText}
        </Text>
        {isSuccess && (
          <Text className="text-center text-xl text-green-600">
            Account created!
          </Text>
        )}
        {error?.status === 404 && (
          <Text className="text-center text-xl text-red-600">
            You put wrong credentials
          </Text>
        )}
        {error?.status === 409 && (
          <Text className="text-center text-xl text-red-600">
            This user already exists.
          </Text>
        )}
        {children}
        {accountText && (
          <View className="mt-2">
            <Text className="text-darkText">{accountText}</Text>
          </View>
        )}
        <TouchableOpacity
          className={"bg-green-400 rounded-md mt-8"}
          // disabled={!isValidate}
          onPress={handleSubmit}
        >
          <Text className="text-white text-center py-2">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
