import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TryingFramer = () => {
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the component is visible
    triggerOnce: false, // Allow animation every time the component is in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Initial state before animation
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
      transition={{ duration: 0.8}} // Animation duration
      style={{
        padding: "20px",
        margin: "50px auto",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        width: "300px",
      }}
    >
      <h2>Scroll Animation</h2>
      <p>This content animates every time it comes into view!</p>
    </motion.div>
  );
};

export default TryingFramer;
