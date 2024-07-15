import ServicesModel from './ServicesModel';

export default function Services() {
  const servicesInfo = {
    furnitureStore: {
      img: 'images/icon-1.png',
      heading: 'Furniture',
      description:
        'Take 10% off for Furniture Store if you spent 500lv. or more',
    },
    design: {
      img: 'images/icon-2.png',
      heading: 'Design',
      description: 'We will create a 3D project for you',
    },
    delivery: {
      img: 'images/icon-3.png',
      heading: 'Delivery',
      description: 'Free Home Delivery for orders over 100lv.'
    },
    installation: {
      img: 'images/icon-4.png',
      heading: 'Installation',
      description: 'Our Qualified Electricians can install your lights'
    }
 };

  return (
    <div className="services_section layout_padding">
      <div className="container">
        <h1 className="services_taital">Our Services</h1>
        <div className="services_section2 layout_padding">
          <div className="row">
            {Object.entries(servicesInfo).map((service) => {
               return <ServicesModel key={service[0]} service={service[1]}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
