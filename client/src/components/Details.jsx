import './css/Details.css';

export default function Details() {
  return (
    <div className="details_section layout">
      <div className="item-details">
        <div className="item-details-img">
          <img src="images/img-2.png" alt="" />
        </div>
        <div className="item-details-more-info">
          <p>Varna Light</p>
          <p>100.00lv.</p>
          <ul className="item-details-description">
            <li>Adjustable height - Drop between 150 to 16 cm.s</li>
            <li>Dimensions: H16xW35xD35 cm.</li>
            <li>Integrated LED</li>
            <li>4000 Kelvins - Cool White</li>
            <li>1200 Lumens</li>
            <li>10 Watts</li>
          </ul>
        </div>
        <div className="item-details-button">
          <button>Buy</button>
        </div>
      </div>

      <div className="comments-wrapper"></div>
    </div>
  );
}
