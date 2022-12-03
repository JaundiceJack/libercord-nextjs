import { NumberInput } from '@mantine/core';

const PriceEntry = ({ label, labelColor="#EEE", value, name, onChange, required=true }) => {
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
    <NumberInput
      label={label}
      name={name}
      value={value}
      radius="md"
      precision={2}
      min={0}
      step={0.01}
      styles={inputStyles}
      onChange={onChange}
      className="mb-3"
      required={required}
    />
  )
}

export default PriceEntry;
