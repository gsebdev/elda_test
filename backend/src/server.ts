import 'dotenv/config';
import app from './app.js';
import { initDatabase } from './database/sequelize.js';
import('./models/models.js');

const PORT = parseInt(process.env.PORT || '3000', 10);

await initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
