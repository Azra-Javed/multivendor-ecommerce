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
        <div className="min-h-screen bg-gray-100 mb-[50px]">
          <Header activeHeading={4} />

          <section className="max-w-6xl mx-auto px-4 py-10">
            {allEvents.length > 0 ? (
              <div className="grid gap-6 grid:cols-1">
                {allEvents.map((event) => (
                  <EventCard key={event._id} active={true} data={event} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[50vh]">
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-700">
                    No Events Available
                  </p>
                  <p className="text-gray-500 mt-2">
                    Check back later for new updates.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default EventsPage;
