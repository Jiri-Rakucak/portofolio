import styled from 'styled-components';

interface MenuToggleProps {
  isOpen: boolean;
}

const Dot = styled.span<{ isOpen: boolean }>`
  width: 8px;
  height: 8px;
  background-color: ${({ theme, isOpen }) => (isOpen ? theme.colors.accent : theme.colors.text)};
  border-radius: 50%;
  display: block;
  transition: background-color 0.3s ease;
`;

const DotRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledMenuToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen }) => {
  return (
    <StyledMenuToggle aria-label="Toggle menu">
      <DotRow>
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
      </DotRow>
      <DotRow>
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
      </DotRow>
      <DotRow>
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
        <Dot isOpen={isOpen} />
      </DotRow>
    </StyledMenuToggle>
  );
};

export default MenuToggle;