import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import { getMenu } from "../services/menu.service";
import starWarsLogo from "../public/images/Star-wars-logo-new-tall.webp";
import { IMenuProps } from "../components/Menu";

interface IOwnProps {
  title: string;
}

type IProps = IOwnProps & IMenuProps;

const Home: NextPage<IProps> = (props) => {
  return (
    <Layout menu={props.menu}>
      <h1>{props.title}</h1>
      <Image src={starWarsLogo} alt="Star Wars Logo" />
    </Layout>
  );
};

// This gets called at build time
export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const menu = await getMenu();

  // Pass data data to the page via props
  return { props: { title: "Hello Headless CMS!", ...menu } };
};

export default Home;
