import './css/CatalogLight.css';

// export class CatalogLight extends React.Component {
//   render() {
//   return (
//         <>
//           <div key={this.props.light._id} className="item-wrapper">
//             <div className="container_main">
//               <img src="images/img-2.png" />
//               <div className="overlay">
//                 <a href="#" className="icon" title="User Profile">
//                   <i className="fa fa-search"></i>
//                 </a>
//               </div>
//             </div>
//             <p className="item-name">{this.props.light.name}</p>
//             <p className="item-price">{this.props.light.price}lv.</p>
//           </div>
//          </>
//       );
//   }
// }
  

export default function CatalogLight(props) {
  const currLight = props.light;

  return (
    <>
        <div className="container_main">
          <img src="images/img-2.png" />
          <div className="overlay">
            <a href="#" className="icon" title="User Profile">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <p className="item-name">{currLight.name}</p>
        <p className="item-price">{currLight.price}lv.</p>
     </>
  );
}
