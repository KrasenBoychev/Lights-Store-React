export default function Header() {
  return (
    <div className="header_section">
      <div className="container-fluid">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <div className="logo"><a href="index.html">
               <img src="images/logo-copy.png" />
               </a></div> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                     <a className="nav-link" href="index.html">Home</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="about.html">About</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="shop.html">Catalog</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="shop.html">Marketplace</a>
                  </li>
               </ul>
               <form className="form-inline my-2 my-lg-0">
                  <h1 className="call_text">Call Us : +01 1234567890</h1>
               </form>
               <div className="search_icon">
                     {/* <li><a href="#"><img src="images/search-icon.png" /></a></li> */}
                     {Object.entries(sessionStorage).length == 0 
                           ?  
                              <ul>
                                 <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
                                 <li className="nav-item"><a className="nav-link" href="#">Register</a></li>
                              </ul>
                           : <ul>
                                 <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
                                 <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
                             </ul>
                     }
               </div>
            </div>
         </nav>
      </div>
   </div>
  );
}
