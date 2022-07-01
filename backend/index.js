const server = require("./server");

// server port
const port = process.env.PORT || 5000;

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`.bgBlue.white);
  });
};
startServer();
