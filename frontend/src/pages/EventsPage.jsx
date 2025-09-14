import Header from "../components/Layout/Header";
import EventCard from "../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents && allEvents[0]} />
          ) : (
            <div className="flex items-center justify-center h-[90vh]">
              <p className="text-lg font-semibold font-family-poppins">
                No Event Available!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
