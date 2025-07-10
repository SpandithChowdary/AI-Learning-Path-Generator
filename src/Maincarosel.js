import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from './Maincarosel.module.css';
import pic1 from './img/meredith-hero.jpg';
import pic2 from './img/LUIS2.png';
import pic3 from './img/rose.jpeg';
import pic4 from './img/Prakash.jpeg';

const careerData = [
  {
    title: "Meredyth Hein",
    description: "Meredyth Hein made the ultimate career switch by leaving her Miss World runner-up status behind to pursue a career as a business intelligence specialist and, later on, as a project manager in the virtual reality solutions company 360TOVISIT. She shares details about her unusual journey and the role 365 Data Science played in it.",
    url:pic1,
    domain:"Data Science"
  },
  {
    title: "Luis",
    description: "Luis transformed his career by mastering both front-end and back-end technologies, becoming a sought-after Full Stack Developer. He delivered impactful projects, from scalable e-commerce platforms to seamless user experiences, driving efficiency and revenue growth. Committed to continuous learning, Luis stays updated with industry trends, contributes to open-source, and mentors aspiring developers, earning recognition as an innovative and collaborative tech leader.",
    url:pic2,
    domain:"Full Stack Developer"

  },
  {
    title: "Rose",
    description: "Rose is a skilled UX Designer who crafts intuitive and visually appealing user experiences. She focuses on creating designs that are both functional and user-friendly. Her work enhances user satisfaction through thoughtful and elegant design solutions.",
    url:pic3,
    domain: "UX Designer"

  },
  {
    title: "Prakash",
    description: "Prakash is a dynamic Digital Marketing Manager with expertise in modern marketing strategies and analytics. He drives business growth through data-driven campaigns and innovative digital solutions. His strategic approach ensures maximum reach, engagement, and ROI.",
    url:pic4,
    domain: "Digital Marketing Manager"
  }
];

const Maincarosel = () => {
  const responsive = {
    0: {
      items: 1,
    },
    768: {
      items: 1,
    },
    1024: {
      items: 1,
    }
  };

  const items = careerData.map((item, index) => (
    <div className={styles.carouselItem} key={index}>
      <div className={styles.profile30}>
        <img src={item.url} className={styles.img32} alt={item.title} />
      </div>
      <div className={styles.content904}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.domain}>{item.domain}</p>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  ));

  return (
    <div className={styles.carouselContainer}>
      <AliceCarousel 
        mouseTracking
        items={items}
        responsive={responsive}
        disableButtonsControls={window.innerWidth < 768}
        disableDotsControls={false}
        autoPlay
        autoPlayInterval={4000}
        infinite
        animationDuration={800}
      />
    </div>
  );
};

export default Maincarosel;