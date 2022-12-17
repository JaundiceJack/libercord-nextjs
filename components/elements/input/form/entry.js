const Entry = ({ type, name, value, label, onChange,
  required=false, extraClasses="", inputClasses=""}) => {
  return (
    <div className={"grid grid-cols-4 items-center "+extraClasses}>
      <label className="text-white text-right font-semibold">
        {label}:
      </label>
      <input type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className={inputClasses ?
          (inputClasses+" rounded p-1 ml-2") :
          "rounded p-1 ml-2 col-span-3 w-full self-end"}/>
    </div>
  )
}

export default Entry;
