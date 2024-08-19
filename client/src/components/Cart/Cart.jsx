import { useAuthContext } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';

import CatalogLight from '../Light/CatalogLight/CatalogLight';

export default function Cart() {
  const { userCart } = useAuthContext();

  useCart();

  return (
    <div className="catalog_section">
      <h1>Your Cart</h1>

      <div className="items-container">
        {userCart.length > 0 ? (
          userCart.map((light) => {
            return <CatalogLight key={light._id} {...light} />;
          })
        ) : (
          <p>There are no lights added to the cart</p>
        )}
      </div>
    </div>
  );
}
