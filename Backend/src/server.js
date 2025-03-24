require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const ambulanceRoutes = require('./routes/ambulances');
app.use('/api/ambulances', ambulanceRoutes);

const hospitalRoutes = require('./routes/hospital');
app.use('/api/hospital', hospitalRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointment', appointmentRoutes);

const specialistsRoutes = require('./routes/specialists');
app.use('/api/specialist', specialistsRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);


