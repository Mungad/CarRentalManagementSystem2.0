import express from 'express';
import car from './router/car.router'
import maintenance from './router/maintenance.router'
import insurance from './router/insurance.router';
import reservation from './router/reservation.router';
import payment from './router/payment.router';
import location from './router/location.router';
import customer from './router/auth.router';
import booking from './router/booking.router';


//import user from './auth/auth.router';
//import carRoutes from './router/car.router';

const app = express();
app.use(express.json()); //used to parse JSON bodies

// routes
//user(app);
//carRoutes(app);
car(app);
maintenance(app);
insurance(app);
reservation(app);
payment(app);
location(app);
customer(app)
booking(app);

app.get('/', (_req, res) => {
    res.send('Car Rental Management System API is running!');
})

app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
}) 