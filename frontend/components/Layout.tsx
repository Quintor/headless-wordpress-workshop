import { FC, Fragment } from 'react';
import { IWpMenu } from '../types/menu';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

interface ILayoutProps {
  menu?: IWpMenu;
}

const Layout: FC<ILayoutProps> = ({ children, menu }) => (
  <Fragment>
    <div className="container">
      <Menu menu={menu} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
    <style jsx={true}>{`
      .container {
        margin: 10,
        padding: 10
      }
    `}</style>
  </Fragment>
);

export default Layout;
