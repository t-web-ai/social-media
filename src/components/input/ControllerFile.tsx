import React, { type ChangeEvent, type RefObject } from "react";
import { Controller, type Control } from "react-hook-form";

type ControllerFileProps = {
  name: string;
  control: Control<any, any, any>;
  accept?: string;
  setImagePreview?: React.Dispatch<React.SetStateAction<string | null>>;
  ref?: RefObject<HTMLInputElement | null>;
};
const ControllerFile = ({
  name,
  control,
  accept,
  setImagePreview,
  ref,
}: ControllerFileProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <input
            type="file"
            ref={ref}
            accept={accept}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.[0] && setImagePreview) {
                field.onChange(e.target.files?.[0]);
                setImagePreview(URL.createObjectURL(e.target.files?.[0]));
              } else {
                if (setImagePreview) setImagePreview(null);
                field.onChange(null);
              }
            }}
          />
        );
      }}
    />
  );
};

export default ControllerFile;
