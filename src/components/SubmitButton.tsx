import React from "react";

const SubmitButton: React.FC = (props) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline"
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
