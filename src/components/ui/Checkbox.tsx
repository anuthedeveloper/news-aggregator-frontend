import React from "react";

interface CheckboxProps {
  category: string;
  handleChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ category, handleChange }) => {
  return (
    <label
      key={category}
      className="inline-flex items-center mb-5 cursor-pointer"
    >
      <input
        type="checkbox"
        name="categories"
        value={category}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-gray-600 "></div>
      <span className="ms-3 text-sm font-medium text-gray-900">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    </label>
  );
};

export default Checkbox;
