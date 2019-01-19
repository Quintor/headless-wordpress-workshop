import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20
};

const Layout: FC = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
