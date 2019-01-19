import React, { Component } from "react";
import Link from "next/link";
import { WpMenuItem } from "../types/menu";

const linkStyle = {
  marginRight: 15
};

interface IProps {
  menu: {
    items: WpMenuItem[];
  };
}

class Menu extends Component<IProps> {
  getSlug(url: string) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
    const menuItems = this.props.menu.items.map(item => {
      if (item.object === "custom") {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        );
      }

      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a style={linkStyle}>{item.title}</a>
        </Link>
      );
    });

    return (
      <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        {menuItems}
      </div>
    );
  }
}

export default Menu;
