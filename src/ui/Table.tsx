import { createContext, useContext, type ReactNode } from "react";
import styled from "styled-components";

// ============================================
// TYPES
// ============================================

type TableContextType = {
  columns: string;
};

type TableProps = {
  columns: string;
  children: ReactNode;
};

type HeaderProps = {
  children: ReactNode;
};

type RowProps = {
  children: ReactNode;
};

type BodyProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};

type FooterProps = {
  children: ReactNode;
};

// ============================================
// STYLES
// ============================================

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// ============================================
// CONTEXT
// ============================================

const TableContext = createContext<TableContextType | null>(null);

function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a Table provider");
  }
  return context;
}

// ============================================
// COMPONENTS
// ============================================

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: HeaderProps) {
  const { columns } = useTableContext();

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }: RowProps) {
  const { columns } = useTableContext();

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data?.length) {
    return (
      <StyledBody>
        <Empty>No data available</Empty>
      </StyledBody>
    );
  }

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function FooterComponent({ children }: FooterProps) {
  return <Footer>{children}</Footer>;
}

// ============================================
// EXPORTS
// ============================================

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = FooterComponent;

export default Table;
