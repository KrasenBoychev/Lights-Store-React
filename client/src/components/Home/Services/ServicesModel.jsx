import './services.css';

export default function ServicesModel({ service }) {
  return (
    <div className="service_model_container">
      <div>
        <img src={service.img} alt={service.img_alt}/>
      </div>
      <h3>{service.heading}</h3>
      <p>{service.description}</p>
    </div>
  );
}
