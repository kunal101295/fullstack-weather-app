const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = "01d9f2d66b5fb9c863aa86b5cb001cd2";

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    if (response.ok) {
      res.json(data);
    } else {
      res.status(404).json({ message: data.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
