import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import starWarsLogo from "../public/images/Star-wars-logo-new-tall.webp";

interface IOwnProps {
  title: string;
}

const Home: NextPage<IOwnProps> = (props) => {
  return (
    <Layout>
      <h1>{props.title}</h1>
      <Image src={starWarsLogo} alt="Star Wars Logo" />
    </Layout>
  );
};

// This gets called at build time
export const getStaticProps: GetStaticProps<IOwnProps> = async (context) => {
  // Pass data data to the page via props
  return { props: { title: "Hello Headless CMS!"} };
};

export default Home;
