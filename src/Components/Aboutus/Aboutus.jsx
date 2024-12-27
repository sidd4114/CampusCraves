import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Aboutus.css';

const Aboutus = () => {
  const [inView, setInView] = useState(false);

  // Intersection Observer callback
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        setInView(true); // Trigger the animation when the element is in view
      } else {
        setInView(false); // Reset when out of view
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    const targetDiv = document.querySelector('.who-are-we');
    if (targetDiv) {
      observer.observe(targetDiv);
    }

    return () => {
      if (targetDiv) {
        observer.unobserve(targetDiv);
      }
    };
  }, []);

  // Define stagger animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.3, // Increase delay to slow down staggered cards
      },
    }),
  };

  return (
    <section className="who-are-we">
      {/* Header Section with Animation Trigger */}
      <motion.div
        className="who-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }} // Fade-in effect when in view
        transition={{ duration: 1.5 }} // Slow down the fade-in duration
      >
        <motion.h2
          className="header-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: inView ? 1 : 0 }} // Slide-up and fade-in effect for heading
          transition={{ duration: 1.5 }} // Slow down the slide-up duration
        >
          Who Are We?
        </motion.h2>
        <motion.p
          className="header-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: inView ? 1 : 0 }} // Slide-up and fade-in effect for paragraph
          transition={{ duration: 1.8 }} // Slow down the slide-up duration
        >
          At Campus Craves, we are dedicated to revolutionizing the way students order food on their campus, making it faster, easier, and more convenient for everyone.
        </motion.p>
      </motion.div>

      {/* Core Values Section with Staggered Animation for Cards */}
      <motion.div
        className="core-values"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }} // Fade-in effect for entire section
        transition={{ duration: 1.5 }} // Slow down the fade-in duration
      >
        <h3 className="core-title">Our Core Values</h3>
        <motion.div
          className="value-cards"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.4, // Increase stagger delay to slow it down
              },
            },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Value Card 1 */}
          <motion.div
            className="value-card"
            variants={cardVariants}
            custom={0} // Custom value to stagger
          >
            <img src="icon-1.png" alt="Avoid Queue" />
            <h4>Avoid Queues</h4>
            <p>No more standing in long lines. Order ahead and pick up your food on time, every time.</p>
          </motion.div>

          {/* Value Card 2 */}
          <motion.div
            className="value-card"
            variants={cardVariants}
            custom={1} // Custom value to stagger
          >
            <img src="icon-2.png" alt="Online Payment" />
            <h4>Online Payment Supported</h4>
            <p>Pay securely online with multiple payment options, making transactions quick and easy.</p>
          </motion.div>

          {/* Value Card 3 */}
          <motion.div
            className="value-card"
            variants={cardVariants}
            custom={2} // Custom value to stagger
          >
            <img src="icon-3.png" alt="Preordering" />
            <h4>Preordering</h4>
            <p>Plan your meals ahead of time. Order in advance and get your food ready for you when you arrive.</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Meet The Founders Section with Enhanced Animation */}
      <motion.div
        className="team-section"
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: inView ? 1 : 0,
          x: inView ? 0 : 100,
        }} // Slide-in from the right with fade-in effect
        transition={{ duration: 1.8, ease: "easeOut" }} // Slow down the slide-in duration
      >
        <h3 className="team-title">Meet The Founders</h3>
        <div className="team-members">
          <motion.div
            className="team-member"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} // Zoom-in effect for team member
            transition={{ duration: 1.5, delay: 0.3 }} // Slow down the zoom-in effect
          >
            <img src="siddhen.jpg" alt="Siddhen" />
            <h4>Siddhen Pise</h4>
            <p>Founder & CEO</p>
          </motion.div>
          <motion.div
            className="team-member"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} // Zoom-in effect for team member
            transition={{ duration: 1.5, delay: 0.4 }} // Slow down the zoom-in effect
          >
            <img src="team-member-2.jpg" alt="Sharon Saju" />
            <h4>Sharon Saju</h4>
            <p>Co-Founder & CTO</p>
          </motion.div>
          <motion.div
            className="team-member"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} // Zoom-in effect for team member
            transition={{ duration: 1.5, delay: 0.5 }} // Slow down the zoom-in effect
          >
            <img src="team-member-3.jpg" alt="Sharon Mishra" />
            <h4>Sharon Mishra</h4>
            <p>Co-Founder & COO</p>
          </motion.div>
          <motion.div
            className="team-member"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} // Zoom-in effect for team member
            transition={{ duration: 1.5, delay: 0.6 }} // Slow down the zoom-in effect
          >
            <img src="team-member-4.jpg" alt="Aditya Patil" />
            <h4>Aditya Patil</h4>
            <p>Co-Founder & CMO</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Goal Section with Enhanced Animation */}
      <motion.div
        className="goal-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 100,
        }} // Slide-up with fade-in effect
        transition={{ duration: 1.8, delay: 0.1 }} // Slow down the slide-up duration
        
      >
        <motion.p
          className="goal-description"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 60 }} // Slide-up and fade-in effect for paragraph
          transition={{ duration: 2.3, delay: 0.3 }} // Slow down the slide-up duration
        >
          We are constantly improving and innovating our services to ensure a seamless, stress-free food ordering experience. By embracing technology and streamlining the ordering process, we aim to completely transform how students interact with campus canteens. Our goal is to provide a faster, more efficient, and enjoyable experience for everyone, removing the barriers of long queues and time wasted. Together, we are working towards making campus dining easier, smarter, and more convenient than ever before!
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Aboutus;
