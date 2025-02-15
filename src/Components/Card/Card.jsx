import React from 'react';
import PropTypes from 'prop-types'; // For prop validation
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Card.css';

const Card = ({ image, title, text, link }) => {
  return (
    <div className="card" style={{ width: "18rem", height: "24rem", overflow: "hidden", position: "relative" }}>
      <img 
        src={image} 
        className="card-img-top" 
        alt={title} 
        style={{ objectFit: "cover", height: "12rem" }} 
      />
      <div className="card-body" style={{ paddingBottom: "3.5rem" }}>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {/* Use Link for navigation */}
        <Link to={"/menu"} className="btn btn-outline-discovery" style={{ position: "absolute", bottom: "1rem", left: "10%" }}>
          Go to menu
        </Link>
      </div>
    </div>
  );
};

// Default props to provide fallback values
Card.defaultProps = {
  image: "https://via.placeholder.com/150", // Placeholder image
  title: "Default Title",
  text: "Default text content for the card.",
  link: "/menu", // Default link to the menu page
};

// Prop types for validation
Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
