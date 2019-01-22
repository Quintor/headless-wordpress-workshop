import Link from 'next/link';
import { Component, Fragment } from 'react';
import { IWpMenuItem } from '../types/menu';

interface IProps {
  menu: {
    items: IWpMenuItem[];
  };
}

class Menu extends Component<IProps> {
  public getSlug(url: string) {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
  }

  public render() {
    const menuItems = this.props.menu.items.map(item => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a className="link">{item.title}</a>
          </Link>
        );
      }

      const slug = this.getSlug(item.url);
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${item.object}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a className="link">{item.title}</a>
        </Link>
      );
    });

    return (
      <Fragment>
        <nav className="nav">
          <Link href="/">
            <a className="link">Home</a>
          </Link>
          {menuItems}
        </nav>
        <style jsx={true}>{`
          .link {
            margin-right: 15px;
          }
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
