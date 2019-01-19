import { FC } from 'react';
import { IWpMenu } from '../types/menu';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

const layoutStyle = {
  margin: 20,
  padding: 20
};

interface ILayoutProps {
  menu: IWpMenu;
}

const Layout: FC<ILayoutProps> = ({ children, menu }) => (
  <div style={layoutStyle}>
    <Header />
    <Menu menu={menu} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
