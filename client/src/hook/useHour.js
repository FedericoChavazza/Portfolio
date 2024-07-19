import { useEffect, useState } from "react";

export const useHour = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateHour = () => {
      setTime(new Date());
    };

    const intervalId = setInterval(updateHour, 60000);

    updateHour();

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
