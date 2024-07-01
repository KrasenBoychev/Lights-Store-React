export default function Banner() {
  return (
    <div className="banner_section layout_padding">
      <div className="container">
         <div id="costum_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
               <div className="carousel-item active">
                  <h1 className="furniture_text">FURNITURE</h1>
                  <p className="there_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some fo</p>
                  <div className="contact_bt_main">
                     <div className="contact_bt"><a href="contact.html">Contact Us</a></div>
                  </div>
               </div>
               <div className="carousel-item">
                  <h1 className="furniture_text">FURNITURE</h1>
                  <p className="there_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some fo</p>
                  <div className="contact_bt_main">
                     <div className="contact_bt"><a href="contact.html">Contact Us</a></div>
                  </div>
               </div>
               <div className="carousel-item">
                  <h1 className="furniture_text">FURNITURE</h1>
                  <p className="there_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some fo</p>
                  <div className="contact_bt_main">
                     <div className="contact_bt"><a href="contact.html">Contact Us</a></div>
                  </div>
               </div>
            </div>
            <a className="carousel-control-prev" href="#costum_slider" role="button" data-slide="prev">
            <i className=""><img src="images/left-arrow.png" /></i>
            </a>
            <a className="carousel-control-next" href="#costum_slider" role="button" data-slide="next">
            <i className=""><img src="images/right-arrow.png" /></i>
            </a>
         </div>
      </div>
   </div>
  )
}
