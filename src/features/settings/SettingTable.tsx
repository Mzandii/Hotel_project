import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { SettingRow } from "./SettingRow";
import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function SettingTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Could not load settings. Please try again.</p>;
  if (!data) return <p>No settings found.</p>;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Minimum nights</div>
        <div>Maximum nights</div>
        <div>Maximum guests</div>
        <div>Breakfast price</div>
        <div>Actions</div>
      </TableHeader>
      <SettingRow settingData={data} />
    </Table>
  );
}
