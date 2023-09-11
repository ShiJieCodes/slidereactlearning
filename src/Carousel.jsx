import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);
  // const nextSlide = () => {
  //   if (currentPerson >= people.length - 1) {
  //     return setCurrentPerson(0);
  //   }
  //   setCurrentPerson(currentPerson + 1);
  // };

  const nextSlide = () => {
    setCurrentPerson((latestValue) => {
      if (latestValue >= people.length - 1) {
        return 0;
      }
      return latestValue + 1;
    });
  };

  const prevSlide = () => {
    setCurrentPerson((latestValue) => {
      if (currentPerson <= 0) {
        return people.length - 1;
      }
      return latestValue - 1;
    });
  };

  // const prevSlide = () => {
  //   if (currentPerson <= 0) {
  //     return setCurrentPerson(people.length - 1);
  //   }
  //   setCurrentPerson(currentPerson - 1);
  // };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map(({ id, image, name, title, quote }, index) => {
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (index - currentPerson)}%)`,
              opacity: index === currentPerson ? 1 : 0,
              visibility: index === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button className="prev" type="button" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button className="next" type="button" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
