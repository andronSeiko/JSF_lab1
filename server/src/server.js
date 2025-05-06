const app = require('./app');
require("dotenv").config();
const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on Port :${PORT}`);
});
