import useCart from '../../hooks/useCart';
import CatalogLight from '../Light/CatalogLight/CatalogLight';
import Spinner from '../Spinner';


export default function Cart() {
  const [cart, setCart, spinner] = useCart();

  return (
    <div className="catalog_section">
      <h1>Your Cart</h1>

      <div className="items-container">
      {spinner ? (
          <Spinner />
        ) : cart.length > 0 ? (
          cart.map((light) => {
            return <CatalogLight key={light._id} {...light} />;
          })
        ) : (
          <p>There are no lights added to the cart</p>
        )}
      </div>
    </div>
    
  );
}