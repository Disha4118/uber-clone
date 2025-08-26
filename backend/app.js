const dotenv=require('dotenv');
const connectDB=require('./db/db');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

connectDB();

app.use(cors({
  origin: "http://localhost:5173",   // frontend origin
  credentials: true                  // allow cookies / Authorization headers
}));

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);
module.exports=app;