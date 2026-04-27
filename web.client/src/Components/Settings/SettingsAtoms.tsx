import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SubLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Toggle Switch
const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.textSecondary}40;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

export const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <SwitchLabel>
    <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
    <Slider />
  </SwitchLabel>
);

// Color Picker
const ColorInputContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StyledColorInput = styled.input`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
`;

export const ColorPicker = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    // Aplikovat změnu do globálního tématu až při opuštění inputu (zavření pickeru)
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  // Pro jistotu můžeme použít i onChange, ale s debounce, nebo spoléhat na to, 
  // že u type="color" se onChange volá až při potvrzení (v některých prohlížečích).
  // Ale onBlur je jistota.
  // Alternativně: onChange={handleChange} a onBlur={() => onChange(localValue)}

  return (
    <ColorInputContainer style={{ backgroundColor: localValue }}>
      <StyledColorInput 
        type="color" 
        value={localValue} 
        onChange={handleChange} // Mění jen lokální stav
        onBlur={handleBlur}     // Propíše do globálního stavu až po dokončení
      />
    </ColorInputContainer>
  );
};