import FooterModel from './FooterModel';

export default function Footer() {
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
      },
    },
    account: {
      heading: 'Account',
      links: {
        login: 'Login',
        register: 'Register',
      },
    },
    opinion: {
      heading: 'Your Opinion',
      links: {
        comment: 'Leave us a comment',
      },
    },
  };

  return (
    <div className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          {Object.entries(footerInfo).map((eachElement) => (
            <FooterModel key={eachElement[0]} element={eachElement[1]} />
          ))}
        </div>
      </div>
    </div>
  );
}
