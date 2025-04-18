import { formatDistance } from "date-fns";

const time = (newDate) => {
    const currentTime = new Date();
    const tt = new Date(newDate);
    return formatDistance(tt, currentTime);
  };
export default time