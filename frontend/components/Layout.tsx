import { IWpMenu } from "../types/menu";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

interface ILayoutProps {
  menu?: IWpMenu;
  children: React.ReactNode;
}

export default function Layout({ menu, children }: ILayoutProps) {
  return (
    <>
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
    </>
  );
}
