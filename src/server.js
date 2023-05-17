const express = require("express");
const bodyParser = require("body-parser");
const jobsRouter = require("./routes/jobs");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/jobs", jobsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
