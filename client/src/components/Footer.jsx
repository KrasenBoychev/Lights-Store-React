export default function Footer() {
  return (
    <div className="footer_section layout_padding">
      <div className="container">
         <div className="row">
                <div className="col-lg-3 col-sm-6">
                <div className="fooer_logo"><img src="images/footer-logo.png" /></div>
                <p className="footer_lorem_text">
                  Visit our offices and we will design your ideas!
                </p>
                </div>
                <div className="col-lg-3 col-sm-6">
                <h1 className="customer_text">LET US HELP YOU</h1>
                <p className="footer_lorem_text">
                    <ul className="let-us-help-icons">
                      <li><img src="images/phone.png" />+01 1234567890</li>
                      <li><img src="images/email.png" />lights@lights.com</li>
                    </ul>
                </p>
                </div>
                <div className="col-lg-3 col-sm-6">
                <h1 className="customer_text">INFORMATION</h1>
                <p className="footer_lorem_text1">
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Our Offices</a></li>
                  </ul> 
                </p>
                </div>
                <div className="col-lg-3 col-sm-6">
                <h1 className="customer_text">Join us</h1>
                <p className="footer_lorem_text">
                  Receive our newsletter, promotions and get personal offers
                </p>
                </div>
         </div>
         <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter your email" aria-label="Enter your email" aria-describedby="basic-addon2" />
            <div className="input-group-append"> 
               <span className="input-group-text" id="basic-addon2"><a href="#">Subscribe</a></span>
            </div>
         </div>
      </div>
   </div>
  );
}
