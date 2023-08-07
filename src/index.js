import app from './app.js';
import { connectDB } from './db.js';


connectDB();
app.listen(8081);
console.log('server en puerto', 8081);