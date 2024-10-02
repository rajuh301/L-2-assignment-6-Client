import { DatePicker } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function FXDatePicker({ label, name }: IProps) {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          label={label}
          {...fields}
          className="max-w-[284px] border rounded-xl"
        />
      )}
    />
  );
}
