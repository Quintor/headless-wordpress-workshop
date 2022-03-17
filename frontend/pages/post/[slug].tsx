import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { IMenuProps } from "../../components/Menu";
import { getMenu } from "../../services/menu.service";
import { IWpPost } from "../../types/post";
import service from "../../services/wordpress.service";
import ErrorPage from "next/error";
import Head from "next/head";

interface IOwnProps {
  post: IWpPost;
}

type IProps = IOwnProps & IMenuProps;

const Post: NextPage<IProps> = ({ post, menu }) => {
  const router = useRouter();

  if ((!router.isFallback && !post?.slug) || !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout menu={menu}>
      <article>
        <Head>
          <title>{post.title.rendered} | Star Wars - WordPress + Next.JS</title>
          <meta
            property="og:image"
            content={post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
          />
        </Head>
        <header>
          <h1>{post.title.rendered}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
        <footer>
          {/* link to categories */}
        </footer>
      </article>
    </Layout>
  );
};

export default Post;

// This gets called at build time
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const menu = await getMenu();
  const post = await service.getPost(params?.slug);

  // Pass data data to the page via props
  return { props: { post, ...menu } };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const allPosts = await service.getPosts();

  return {
    paths: allPosts.map(({ slug }) => `/post/${slug}`) || [],
    fallback: true,
  };
};
