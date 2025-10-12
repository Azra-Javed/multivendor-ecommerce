import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../server";

const CountDown = ({ data }) => {
  const startDate = new Date(data.start_Date);
  const finishDate = new Date(data.end_Date);

  const [status, setStatus] = useState(""); // "not-started" | "running" | "finished"
  const [timeLeft, setTimeLeft] = useState({});

  function calculateTimeLeft() {
    const now = new Date();

    if (now < startDate) {
      setStatus("not-started");
      return {};
    }

    if (now >= startDate && now < finishDate) {
      setStatus("running");

      const difference = finishDate - now;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    // expired
    setStatus("finished");
    return {};
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (status === "finished") {
        axios.delete(`${server}/event/delete-shop-event/${data._id}`);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data._id, data.start_Date, data.end_Date, status]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) return null;

    return (
      <span key={interval} className="text-[25px] !text-[#FFD166]  mx-1">
        {timeLeft[interval]} {interval}
      </span>
    );
  });

  return (
    <div>
      {status === "not-started" && (
        <span className="text-[orange] text-[25px]">Not started yet</span>
      )}

      {status === "running" && timerComponents}

      {status === "finished" && (
        <span className="text-[red] text-[25px]">Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
