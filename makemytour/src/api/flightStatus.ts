export const getFlightStatus = async (flightId: string) => {
  const mockStatuses = [
    {
      status: "On Time",
      delayReason: null,
      eta: "10:45 PM",
    },
    {
      status: "Delayed by 1h",
      delayReason: "Bad Weather",
      eta: "11:45 PM",
    },
    {
      status: "Boarding",
      delayReason: null,
      eta: "10:30 PM",
    },
  ];        

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStatuses[Math.floor(Math.random() * mockStatuses.length)]);
    }, 500);
  });
};
