import styles from "../../styles/style";
import EventsCard from "./EventCard";
const Events = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          <EventsCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
