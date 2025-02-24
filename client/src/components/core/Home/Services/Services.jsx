import ServicesModel from "./ServicesModel";
import "./services.css";

export default function Services() {
  const servicesInfo = {
    design: {
      img: "images/services/icon-2.png",
      img_alt: "Design_Icon",
      heading: "Design",
      description: "We will create a 3D project for you",
    },
    delivery: {
      img: "images/services/icon-3.png",
      img_alt: "Delivery_Icon",
      heading: "Delivery",
      description: "Free Home Delivery for orders over 100lv.",
    },
    installation: {
      img: "images/services/icon-4.png",
      img_alt: "Installation_Icon",
      heading: "Installation",
      description: "Our Qualified Electricians can install your lights",
    },
  };

  return (
    <div className="services_container">
      <h2>Services</h2>
      <div className="services_description">
        {Object.entries(servicesInfo).map((service) => {
          return <ServicesModel key={service[0]} service={service[1]} />;
        })}
      </div>
    </div>
  );
}
