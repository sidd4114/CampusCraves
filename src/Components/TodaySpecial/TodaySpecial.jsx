import React, { useEffect } from 'react';
import './TodaySpecial.css';
import Card from '../Card/Card';

const TodaysSpecials = () => {
  useEffect(() => {
    const handleScroll = () => {
      const specialSection = document.querySelector('.specials-heading');
      const cards = document.querySelectorAll('.card');

      // Check if the heading is in the viewport
      const rectHeading = specialSection.getBoundingClientRect();
      if (rectHeading.top < window.innerHeight && rectHeading.bottom >= 0) {
        specialSection.classList.add('slide-in');
      } else {
        specialSection.classList.remove('slide-in');
      }

      // Check if each card is in the viewport
      cards.forEach((card) => {
        const rectCard = card.getBoundingClientRect();
        if (rectCard.top < window.innerHeight && rectCard.bottom >= 0) {
          card.classList.add('in-view');
        } else {
          card.classList.remove('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case the elements are already in view when the page loads
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="todays-specials">
      <h1 className="specials-heading">Today's Specials</h1>
      <div className="d-flex flex-wrap justify-content-around" style={{ gap: '30px' }}>
        <Card
          className="card"
          image="../specials_img/gulabjamun.jpg"
          title="Gulab Jamun"
          text="Soft, golden dumplings soaked in rich, aromatic syrup — a timeless Indian dessert that's sweet, warm, and irresistible."
          link="https://example.com/card1"
        />
        <Card
          className="card"
          image="../specials_img/dhokla.jpg"
          title="Dhokla"
          text="A soft, fluffy steamed snack with a tangy flavor, topped with mustard seeds and curry leaves."
          link="https://example.com/card2"
        />
        <Card
          className="card"
          image="../bg3.jpg"
          title="Noodles"
          text="A deliciously tangled mix of flavors, spices, and textures, perfect for satisfying cravings."
          link="https://example.com/card3"
        />
        <Card
          className="card"
          image="../specials_img/pizza_bg.jpeg"
          title="Chicken Pizza"
          text="A cheesy delight loaded with tender chicken, rich sauce, and a crispy crust for the perfect bite."
          link="https://example.com/card4"
        />
      </div>
    </div>
  );
};

export default TodaysSpecials;
