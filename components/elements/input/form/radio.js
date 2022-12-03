const Radio = ({options, name, value, label, required=false, onChange, extraClasses}) => {
  return (
    <div className={"grid gap-x-4 items-center mb-6 " +
      (options.length > 0 ? "grid-cols-"+(options.length+1)+" " : "") +
      extraClasses}>
      <label className="text-white text-right font-semibold">{label}:</label>
      {options.map((option, index) => {
        return (
          <label key={index} className="flex flex-col justify-center self-end radioContainer">
            <p className={"text-white text-center font-semibold " +
              (!option.label2 ? "mb-1" : "")}>
                {option.label}
            </p>
            {option.label2 &&
              <p className="text-white text-center font-semibold mb-1">
                {option.label2}
              </p>
            }
            <div className="relative w-full flex justify-center mt-1">
              <input type="radio" name={name} value={option.value} required={required}
                onChange={onChange} checked={option.value === value} />
              <span className="checkmark" />
            </div>
          </label>
        )
      })}
    </div>
  )
}

export default Radio;
