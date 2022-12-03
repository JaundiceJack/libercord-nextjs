import { Textarea } from '@mantine/core';

const AreaEntry = ({ label, labelColor="#EEE", value, name, onChange, required=true }) => {
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
      alignItems: 'start'
    },
  }

  return (
    <Textarea
      label={label}
      name={name}
      value={value}
      radius="md"
      size="xs"
      styles={inputStyles}
      onChange={onChange}
      className="mb-3"
      required={required} />
  )
}

export default AreaEntry;
