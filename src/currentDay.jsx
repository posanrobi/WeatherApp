const CurrentDay = () => {
  const today = new Date();
  const day = today.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <p>{days[day]}</p>
    </>
  );
};

export default CurrentDay;
