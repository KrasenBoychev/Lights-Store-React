/* eslint-disable react/prop-types */
export default function ServicesModel({ service }) {
    console.log(service);
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="icon_1">
        <img src={service.img} />
      </div>
      <h2 className="furnitures_text">{service.heading}</h2>
      <p className="dummy_text">{service.description}</p>
    </div>
  );
}
