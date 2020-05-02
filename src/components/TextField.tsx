import React from "react";

type Props = {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  let className = "";

  if (props.prefix) {
    className += " pl-6 ";
  }

  if (props.suffix) {
    className += " pr-6 ";
  }

  return (
    <>
      {props.label && <div className="block mb-1 text-sm font-medium leading-5 text-gray-700">{props.label}</div>}
      <div className="relative">
        {props.prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center">
            {React.isValidElement(props.prefix) && <>{props.prefix}</>}
            {!React.isValidElement(props.prefix) && (
              <span className="pl-3 text-gray-600 sm:text-sm sm:leading-5">{props.prefix}</span>
            )}
          </div>
        )}
        <input className={`${className} form-input block w-full px-4 py-2 leading-tight`} {...props} ref={ref} />
        {props.suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {React.isValidElement(props.suffix) && <>{props.suffix}</>}
            {!React.isValidElement(props.suffix) && (
              <span className="pr-3 text-gray-600 sm:text-sm sm:leading-5">{props.suffix}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
});

export default TextField;
