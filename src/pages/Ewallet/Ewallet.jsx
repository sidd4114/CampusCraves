import React from 'react';
import { motion } from 'framer-motion';

const Ewallet = () => {
  return (
    <div
      style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f2f2f2, #ffffff)', // Elegant gradient
        backgroundSize: '200% 200%',
        fontFamily: 'Tenor Sans, sans-serif',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Container to control staggered effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.5 } }, // Stagger children animation
        }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* "Introducing" Animation */}
        <motion.div
          variants={{
            hidden: { y: -100, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
          }}
          style={{
            fontSize: '3.5rem',  // Larger font for impact
            margin: '10px 0',
            color: '#333',
            fontWeight:'normal',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',  // Elegant text shadow
          }}
        >
          Introducing
        </motion.div>

        {/* "you" and "to" Animation */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            variants={{
              hidden: { x: -100, opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
            }}
            style={{
              fontSize: '3.5rem',
              margin: '0 5px',
              color: '#333',
              
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            you
          </motion.div>

          <motion.div
            variants={{
              hidden: { x: 100, opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
            }}
            style={{
              fontSize: '3.5rem',
              margin: '0 5px',
              color: '#333',
             
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            to
          </motion.div>
        </div>

        {/* "Ewallet" Animation */}
        <motion.div
          variants={{
            hidden: { y: 100, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
          }}
          style={{
            fontSize: '4rem',  // Larger for emphasis
            margin: '20px 0',
            color: '#333',
            fontWeight: 'bold',
            textShadow: '2px 2px 15px rgba(0, 0, 0, 0.15)',  // Enhanced shadow
          }}
        >
          Ewallet
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Ewallet;
