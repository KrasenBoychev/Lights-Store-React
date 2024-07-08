export default function OurLights() {
  return (
    <div className="furnitures_section layout_padding">
      <div className="container">
         <h1 className="our_text">Our Lights</h1>
         {/* <p className="ipsum_text">There are many variations of passages of Lorem Ipsum </p> */}
         <div className="furnitures_section2 layout_padding">
            <div className="row">
               <div className="col-md-6">
                  <div className="container_main">
                     <img src="images/LED-ceiling-lights.jpg" alt="Avatar" className="image" />
                     <div className="overlay">
                        <a href="#" className="icon" title="User Profile">
                        <i className="fa fa-search"></i>
                        </a>
                     </div>
                  </div>
                  <h3 className="temper_text">Integrated LED Lights</h3>
                  <p className="dololr_text">Choosing among different shapes and colour temperatures, these lights bring luxurious finish to your place. They are energy efficient and their working life is up to 25 000 hours.</p>
               </div>
               <div className="col-md-6">
                  <div className="container_main">
                     <img src="images/ceiling-lights-home.jpg" alt="Avatar" className="image" />
                     <div className="overlay">
                        <a href="#" className="icon" title="User Profile">
                        <i className="fa fa-search"></i>
                        </a>
                     </div>
                  </div>
                  <h3 className="temper_text">Lights with bulbs</h3>
                  <p className="dololr_text">Available in modern and traditional style, these lights are suitable for any place. We highly recommend buying our LED bubls with them which last up to 15 000 hours.</p>
               </div>
            </div>
         </div>
      </div>
   </div>
  );
}
