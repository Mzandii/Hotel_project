// import styled from "styled-components";

// import UpdateSettingsForm from "./UpdateSettingsForm";

// // ============================================
// // STYLES
// // ============================================

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Value = styled.div`
//   font-size: 1.6rem;
//   font-weight: 500;
//   color: var(--color-grey-700);
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
// `;

// // ============================================
// // TYPES
// // ============================================

// type SettingType = {
//   id: number;
//   minBookingLength: number;
//   maxBookingLength: number;
//   maxGuestsPerBooking: number;
//   breakfastPrice: number;
// };

// // ============================================
// // COMPONENT
// // ============================================

// export function SettingRow({ settingData }: { settingData: SettingType }) {
//   return (
//     <>
//       <UpdateSettingsForm settings={settingData} />
//     </>
//   );
// }
