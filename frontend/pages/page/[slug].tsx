import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { IMenuProps } from "../../components/Menu";
import { getMenu } from "../../services/menu.service";
import service from "../../services/wordpress.service";
import { IWpPage } from "../../types/page";

interface IOwnProps {
  page: IWpPage;
}

type IProps = IOwnProps & IMenuProps;

const Page: NextPage<IProps> = ({ page, menu }) => {
  const router = useRouter();

  if ((!router.isFallback && !page?.slug) || !page) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout menu={menu}>
      <article>
        <Head>
          <title>{page.title.rendered} | Star Wars - WordPress + Next.JS</title>
        </Head>
        <header>
          <h1>{page.title.rendered}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
      </article>
    </Layout>
  );
};

export default Page;

// This gets called at build time
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const menu = await getMenu();
  const page = await service.getPage(params?.slug);

  // Pass data data to the page via props
  return { props: { page, ...menu } };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const allPages = await service.getPages();

  return {
    paths: allPages.map(({ slug }) => `/page/${slug}`) || [],
    fallback: true,
  };
};
