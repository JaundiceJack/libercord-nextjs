import { RadioGroup, Radio } from '@mantine/core';

const RadioEntry = ({ label, labelColor="#EEE", value, name, onChange, options, required=true }) => {
  // Extra input styling for Mantine components
  const inputStyles = {
    label: {
      color: labelColor,
      fontSize: 16+'px',
      marginRight: 8+'px',
      marginBottom: 0,
      textAlign: 'right',
      fontWeight: 600,
    },
    required: { display: 'none' },
    root: {
      display: 'grid',
      gridTemplateColumns: '2fr 4fr',
      alignItems: 'center'
    },
  }

  return (
    <RadioGroup
      label={label}
      name={name}
      value={value}
      styles={inputStyles}
      onChange={onChange}
      className="mb-3"
      required={required} >
      {
        options.map((option, index) => {
          return <Radio key={index} value={option.value} label={option.label} />
        })
      }
    </RadioGroup>
  )
}

export default RadioEntry;
