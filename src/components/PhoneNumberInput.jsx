import PhoneInput from 'react-phone-number-input';
import { Text } from '@mantine/core';

const phoneNumberStyle = {
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 23,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  color: 'var(--layout-5)',
};

export function PhoneNumberInput({
  icon,
  defaultCountry,
  id,
  phoneNumberValue,
  setPhoneNumberValue,
  label,
  isInvalidNumber,
}) {
  return (
    <div>
      <label
        htmlFor={`#${id}`}
        className="inputLabel mantine-InputWrapper-label mantine-TextInput-label"
        style={{ position: 'relative' }}
      >
        {label}&nbsp;
        <span style={{ color: '#fa5252' }}>*</span>
        <PhoneInput
          className={isInvalidNumber ? 'PhoneNumberInput invalidInput' : 'PhoneNumberInput'}
          id={id}
          // className={String(phoneNumberValue).length <= 9 ? 'invalidInput' : ''}
          international
          defaultCountry={defaultCountry}
          value={phoneNumberValue}
          onChange={setPhoneNumberValue}
        />
        {/* icon  */}
        <div className={'phoneNumberIcon invalidInput'} style={phoneNumberStyle}>
          {icon}
        </div>
      </label>
      {isInvalidNumber && <Text color="red">invalid Number e.g +923164204082</Text>}
    </div>
  );
}

export default PhoneNumberInput;
