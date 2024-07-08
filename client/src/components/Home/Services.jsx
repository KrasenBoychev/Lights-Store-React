export default function Services() {
  return (
    <div className="services_section layout_padding">
      <div className="container">
         <h1 className="services_taital">our services</h1>
         {/* <p className="many_taital">There are many variations of passages of Lorem Ipsum </p> */}
         <div className="services_section2 layout_padding">
            <div className="row">
               <div className="col-lg-3 col-sm-6">
                  <div className="icon_1"><img src="images/icon-1.png" /></div>
                  <h2 className="furnitures_text">Furniture</h2>
                  <p className="dummy_text">Take 10% off for Furniture Store if you spent 500lv. or more with us</p>
                  {/* <div className="read_bt_main">
                     <div className="read_bt"><a href="#">Read More</a></div>
                  </div> */}
               </div>
               <div className="col-lg-3 col-sm-6">
                  <div className="icon_1"><img src="images/icon-2.png" /></div>
                  <h2 className="furnitures_text">Design</h2>
                  <p className="dummy_text">We will create a 3D project for free if you buy the lights from us</p>
                  {/* <div className="read_bt_main">
                     <div className="read_bt"><a href="#">Read More</a></div>
                  </div> */}
               </div>
               <div className="col-lg-3 col-sm-6">
                  <div className="icon_1"><img src="images/icon-3.png" /></div>
                  <h2 className="furnitures_text">Delivery</h2>
                  <p className="dummy_text">Free Home Delivery for orders over 100lv.</p>
                  {/* <div className="read_bt_main">
                     <div className="read_bt"><a href="#">Read More</a></div>
                  </div> */}
               </div>
               <div className="col-lg-3 col-sm-6">
                  <div className="icon_1"><img src="images/icon-4.png" /></div>
                  <h2 className="furnitures_text">Installation</h2>
                  <p className="dummy_text">Qualified Electricians who can install all lights for you</p>
                  {/* <div className="read_bt_main">
                     <div className="read_bt"><a href="#">Read More</a></div>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   </div>
  );
}
