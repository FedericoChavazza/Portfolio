import { useEffect, useState } from "react";

export const useHour = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 60000 - (Date.now() % 60000));

    return () => clearTimeout(timer);
  }, []);

  return `${
    time.getHours().toString().length === 1
      ? "0" + time.getHours()
      : time.getHours()
  }:${
    time.getMinutes().toString().length === 1
      ? "0" + time.getMinutes()
      : time.getMinutes()
  }`;
};
