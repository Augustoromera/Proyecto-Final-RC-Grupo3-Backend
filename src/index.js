import app from './app.js';
import { connectDB } from './models/db.js';


connectDB();
app.listen(6707);
console.log('server en puerto', 6707);

