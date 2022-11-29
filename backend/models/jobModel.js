const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter job Name"],
  },
  description: {
    type: String,
    rquired: [true, "Please Enter job description"],
  },
  price: {
    type: Number,
    rquired: [true, "Please Enter job Price"],
    maxLength: [4, "price cannot exceed 8 characters"],
  },
  // rating: {
  //   type: Number,
  //   default: 0,
  // },

  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  category: {
    type: String,
    required: [true, "please Enter Job Category"],
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
