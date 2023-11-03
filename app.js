const express = require('express');
const app = express();
const cors= require('cors');
const heartRateRoutes = require("./routes/heartRateRoutes.js");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use('/patient', heartRateRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




