const AmbulanceSchema = new mongoose.Schema({
    name: String,
    provider: String,
    state: String,
    contact: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
