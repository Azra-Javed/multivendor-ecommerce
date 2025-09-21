import styles from "../../../styles/style";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {allEvents?.length > 0 && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length > 0 && <EventCard data={allEvents[0]} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
