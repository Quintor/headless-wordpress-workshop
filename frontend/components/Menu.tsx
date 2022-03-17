import Link from "next/link";
import { IWpMenu } from "../types/menu";

export interface IMenuProps {
  menu?: IWpMenu;
}

function getSlug(url: string) {
  const parts = url.split("/");
  return parts.length > 2 ? parts[parts.length - 2] : "";
}

export default function Menu({ menu }: IMenuProps) {
  const menuItems = menu?.items?.map((item) => {
    if (item.object === "custom") {
      return (
        <Link href={item.url} key={item.ID}>
          <a className="link">{item.title}</a>
        </Link>
      );
    }

    const slug = getSlug(item.url);
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
    <>
      <nav className="nav">
        <Link href="/">
          <a className="link">Home</a>
        </Link>
        {menuItems}
      </nav>
      <style jsx={true}>{`
        .nav {
          padding: 20px;
          background-color: whitesmoke;
        }
      `}</style>
    </>
  );
}
