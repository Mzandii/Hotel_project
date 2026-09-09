import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useCloseOnClick from "../hooks/useCloseOnClick";

// ============================================
// TYPES
// ============================================

type Position = {
  x: number;
  y: number;
};

type MenusContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position | null;
  setPosition: (pos: Position) => void;
};

type MenusProps = {
  children: ReactNode;
};

type ToggleProps = {
  id: string;
};

type ListProps = {
  id: string;
  children: ReactNode;
};

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

type StyledListProps = {
  position: Position;
};

// ============================================
// STYLES
// ============================================

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 1000;
  min-width: 18rem;
  list-style: none;
  padding: 0.4rem 0;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// ============================================
// CONTEXT
// ============================================

const MenusContext = createContext<MenusContextType | null>(null);

function useMenusContext() {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus components must be used within a Menus provider");
  }
  return context;
}

// ============================================
// COMPONENTS
// ============================================

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

function Toggle({ id }: ToggleProps) {
  const { openId, open, close, setPosition } = useMenusContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useMenusContext();

  // ✅ Use the hook correctly
  const ref = useCloseOnClick({ close, listenCapturing: true });

  if (openId !== id) return null;
  if (!position) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useMenusContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

// ============================================
// COMPOUND COMPONENT ASSIGNMENT
// ============================================

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
