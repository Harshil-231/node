const Admin = require("../models/AdminModel");
const Owner = require('../models/OwnerModel');
const Salon = require('../models/SalonModel'); // Assuming you have a Salon model
const Customer = require('../models/CustomerModel');
// const Appointment = require("../models/AppointmentModel");

// Get counts for dashboard boxes
const getAdminCounts = async (req, res) => {
  try {
    const ownerCount = await Owner.countDocuments();
    const salonCount = await Salon.countDocuments();
    const customerCount = await Customer.countDocuments();
    const appointmentCount = await Appointment.countDocuments();

    res.status(200).json({
      owners: ownerCount,
      salons: salonCount,
      customers: customerCount,
      appointments: appointmentCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Error fetching counts', error: error.message });
  }
};

const getOwners = async (req, res) => {
    try {
      const owners = await Owner.find(); // Or add pagination/filtering
      res.status(200).json(owners);
    } catch (error) {
      console.error('Error fetching owners:', error);
      res.status(500).json({ message: 'Error fetching owners', error: error.message });
    }
  };
  const getSalons = async (req, res) => {
    try {
      const salons = await Salon.find();
      res.status(200).json(salons);
    } catch (error) {
      console.error('Error fetching salons:', error);
      res.status(500).json({ message: 'Error fetching salons', error: error.message });
    }
  };
  const getCustomers = async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
  };
  const getAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
  };


// Add other Admin-related controller functions here
// For example, creating an admin user, managing permissions, etc.

module.exports = {
  getAdminCounts,
  getOwners,
  getSalons,
  getCustomers,
  getAppointments
  // ... other admin controller functions
};