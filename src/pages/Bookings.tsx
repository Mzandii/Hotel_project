import BookingTable from "../features/bookings/BookingTable";
import { useBookings } from "../features/bookings/useBookings";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { PulseLoader } from "react-spinners";

const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

function Bookings() {
  const { bookings, isLoading, error } = useBookings();

  if (isLoading)
    return (
      <SpinnerDiv>
        <PulseLoader />
      </SpinnerDiv>
    );

  if (error) return <p>Could not load bookings. Please try again.</p>;

  if (!bookings?.length) return <p>No bookings found.</p>;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
      </Row>
      <BookingTable bookings={bookings} />
    </>
  );
}

export default Bookings;
