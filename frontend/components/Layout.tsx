import Header from "./Header";
import Footer from "./Footer";
import { FC } from "react";

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
