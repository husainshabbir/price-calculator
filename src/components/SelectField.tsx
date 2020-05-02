import React from "react";

type Props = {} & React.InputHTMLAttributes<HTMLSelectElement>;

const SelectField = React.forwardRef((props: Props, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <select
      className="h-full py-0 pl-2 text-right text-gray-700 bg-transparent border-transparent form-select pr-7"
      ref={ref}
      {...props}
    />
  );
});

export default SelectField;
