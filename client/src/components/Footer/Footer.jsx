import { useAuthContext } from '../../contexts/AuthContext';

import FooterModel from './FooterColumnModel';
import Copyright from './Copyright';

import './footer.css';

export default function Footer() {
  const { isAuthenticated } = useAuthContext();

  const footerInfo = {
    help: {
      heading: 'Let us help you',
      list: {
        phone: ['images/phone.png', '+01 1234567890'],
        email: ['images/email.png', 'lights@lights.com'],
      },
    },
    information: {
      heading: 'Information',
      links: {
        about: 'About Us',
        catalog: 'Catalog',
        marketplace: 'Marketplace',
        'our-store': 'Our Store',
      },
    },
    account: {
      heading: 'Account',
      links: isAuthenticated
        ? {
            cart: 'Cart',
            profile: 'Profile',
            logout: 'Logout'
          }
        : {
            login: 'Login',
            register: 'Register',
          }
    },
    opinion: {
      heading: 'Your Opinion',
      links: {
        comment: 'Leave us a comment',
      },
    },
  };

  return (
    <footer>
        <div className="footer_info">
          {Object.entries(footerInfo).map((eachElement) => (
            <FooterModel key={eachElement[0]} element={eachElement[1]} />
          ))}
        </div>
      <Copyright />
    </footer>
  );
}
