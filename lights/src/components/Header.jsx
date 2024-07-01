export default function Header() {
  return (
    <div className="header_section">
      <div className="container-fluid">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="logo"><a href="index.html"><img src="images/logo.png" /></a></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                     <a className="nav-link" href="index.html">Home</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="services.html">services</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="about.html">About</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="shop.html">Shop</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="contact.html">Contact</a>
                  </li>
               </ul>
               <form className="form-inline my-2 my-lg-0">
                  <h1 className="call_text">Call Us : +01 1234567890</h1>
               </form>
               <div className="search_icon">
                  <ul>
                     <li><a href="#"><img src="images/search-icon.png" /></a></li>
                     <li><a href="#">LOGIN</a></li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   </div>
  );
}
