import React from 'react';
import { motion } from 'framer-motion';
import './Ewallet.css'; // Import CSS

// Parent container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
};

// Image animation
const imageVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 2, ease: 'easeOut' } },
};

// Text animations
const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
};

// Steps Data
const steps = [
  { title: "Add funds to your E-Wallet", icon: "💳" },
  { title: "Order food and drinks from participating restaurants", icon: "🍔" },
  { title: "Scan the QR code at checkout", icon: "📱" },
  { title: "Pay with your E-Wallet balance", icon: "💰" },
  { title: "Enjoy your meal", icon: "🍽️" },
];

const Ewallet = () => {
  return (
    <>
      {/* E-Wallet Section */}
      <motion.div
        className="ewallet-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Image */}
        <motion.div className="ewallet-image" variants={imageVariants}>
          <img src="/ewallet.jpg" alt="Ewallet" className="ewallet-img" />
        </motion.div>

        {/* Right Side: Text and Button */}
        <motion.div className="ewallet-text">
          <motion.div className="ewallet-intro" variants={textVariants}>
            Introducing
          </motion.div>

          <div className="ewallet-you-to">
            <motion.div className="ewallet-you" variants={textVariants}>
              you
            </motion.div>
            <motion.div className="ewallet-to" variants={textVariants}>
              to
            </motion.div>
          </div>

          <motion.div className="ewallet-title" variants={textVariants}>
            Ewallet
          </motion.div>

          <motion.h2 className="ewallet-description" variants={textVariants}>
            Pay for your food with just a tap. Easily add funds and pay for your order. Plus, get 10% off your first E-Wallet purchase.
          </motion.h2>

          <motion.button className="ewallet-button" variants={textVariants}>
            <span>Create an account</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Separate Div for How It Works Section */}
      <div className="how-it-works-container">
        <h2 className="section-title left-align">How it works</h2>
        <motion.div 
          className="steps-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3, duration: 0.8, ease: "easeOut" }
            }
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              className="step-card"
              key={index}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            >
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Ewallet;
