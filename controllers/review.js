const Review = require('../models/review');

// Add a new review
const addReview = async (req, res) => {
  try {
    const {
      name,
      cleanliness,
      management,
      payment,
      accomodation,
      ambulanceFacilities,
      parking,
      patientCare,
      treatment,
      reviewmsg
    } = req.body;

    const newReview = new Review({
      name,
      cleanliness,
      management,
      payment,
      accomodation,
      ambulanceFacilities,
      parking,
      patientCare,
      treatment,
      reviewmsg
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: savedReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({reviews:reviews});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};


const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.body;
  
      if (!reviewId) {
        return res.status(400).json({ message: 'Review ID is required' });
      }
  
      const deleted = await Review.findByIdAndDelete(reviewId);
  
      if (!deleted) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
  };

module.exports = {
  addReview,
  getAllReviews,
  deleteReview
};
