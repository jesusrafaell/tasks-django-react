import React from "react";

interface Props {
  label: string;
  inputProp?: JSX.Element | null;
  children: React.ReactNode;
}

const InputForm: React.FC<Props> = ({ children, label, inputProp }) => {
  return (
    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
      <div className="flex justify-between">
        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400 capitalize">
          {label}
        </label>

        {inputProp ? (
          <div className="absolute right-3 translate-y-2 text-green-200">
            {inputProp}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default InputForm;
