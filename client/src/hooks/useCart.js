import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { updateUserCart } from '../../api/cart-api';
import { useAuthContext } from '../contexts/AuthContext';

export function useCart() {
    const { userCart } = useAuthContext();

    const [cart, setCart] = useState(userCart);

    useEffect(() => {
        (async function updateCart() {
            

            try {
                const lightsIds = cart.map(light => light._id);
                await updateUserCart(lightsIds);
            } catch(error) {
                toast(error.message);
            }
        })();
    });
}