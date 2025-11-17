export const get = (endpoint) => {
  // Simula una chiamata a un server
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint === '/daily') {
        resolve([
          { id: 1, summary: "Sunny", temp: { avg: 75 }, precip: 10 },
          { id: 2, summary: "Cloudy", temp: { avg: 68 }, precip: 20 }
        ]);
      } else if (endpoint === '/hourly') {
        resolve([
          { id: 1, summary: "Sunny", temp: { avg: 70 }, precip: 5 },
          { id: 2, summary: "Rain", temp: { avg: 65 }, precip: 50 }
        ]);
      }
    }, 500); // Simula ritardo del server
  });
};
