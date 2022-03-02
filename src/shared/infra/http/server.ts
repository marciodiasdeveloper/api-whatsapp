import { app } from "./app";

app.listen(process.env.PORT || 3006, () =>
  console.log(`Server is running at port ${process.env.PORT || 3006}!`)
);
