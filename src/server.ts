import app from "./app";
import { PORT } from "./constants/amaris.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));