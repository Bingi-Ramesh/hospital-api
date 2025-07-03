const Bill = require('../models/bill');
const Appointment = require('../models/appointment'); // adjust the path if needed
const generateBill = async (req, res) => {
    try {
      const {
        appointmentId,
        appointmentFee,
        doctorFee,
        ambulanceCharges,
        labCharges,
        bedCharges,
        xrayCharges,
        medicineCharges,
        total,
      } = req.body;
  
      const billData = {
        appointmentId,
        appointmentFee,
        doctorFee,
        ambulanceCharges,
        labCharges,
        bedCharges,
        xrayCharges,
        medicineCharges,
        total,
        
      };
  
      const bill = await Bill.findOneAndUpdate(
        { appointmentId },
        billData,
        { new: true, upsert: true }
      );
     
      await Appointment.findByIdAndUpdate(appointmentId, { status: 'Bill Generated' });
      res.status(201).json({ message: 'Bill generated successfully', bill });
    } catch (error) {
      console.error('Error generating bill:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
const getBill = async (req, res) => {
  try {
    const { appointmentId } = req.query;

    const bill = await Bill.findOne({ appointmentId });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json({ bill });
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  generateBill,
  getBill,
};
