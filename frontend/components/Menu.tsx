import Link from 'next/link';
import { Component, Fragment } from 'react';
import { IWpMenuItem } from '../types/menu';

interface IProps {
  menu?: {
    items: IWpMenuItem[];
  };
}

class Menu extends Component<IProps> {
  public render() {
    return (
      <Fragment>
        <nav className="nav">
          <Link href="/">
            <a className="link">Home</a>
          </Link>
        </nav>
        <style jsx={true}>{`
          .nav {
            padding: 20px;
            background-color: whitesmoke;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Menu;
