import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js' // Import the sendEmail function

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Post-save middleware to send email after saving contact data
contactSchema.post('save', async function (doc) {
  const emailOptions = {
    to: 'adamadiouf2017@gmail.com', // Replace with recipient's email address
    subject: 'New Contact Form Submission',
    message: `
      First Name: ${doc.firstName}
      Last Name: ${doc.lastName}
      Phone: ${doc.phone}
      Description: ${doc.description}
      Address: ${doc.address}
      Total Price: ${doc.totalPrice}
    `,
  }

  try {
    // Call the sendEmail function with emailOptions
    await sendEmail(emailOptions)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
