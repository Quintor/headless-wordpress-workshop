import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { IMenuProps } from "../../components/Menu";
import PostLink from "../../components/PostLink";
import { getMenu } from "../../services/menu.service";
import service from "../../services/wordpress.service";
import { IWpCategory } from "../../types/category";
import { IWpPost } from "../../types/post";

interface IOwnProps {
  category: IWpCategory;
  posts: IWpPost[];
}

type IProps = IOwnProps & IMenuProps;

const Category: NextPage<IProps> = ({ category, posts, menu }) => {
  const router = useRouter();

  if ((!router.isFallback && !category?.slug) || !category) {
    return <ErrorPage statusCode={404} />;
  }

  const postList = posts.map((post) => (
    <li key={post.id}>
      <PostLink post={post} />
    </li>
  ));

  return (
    <Layout menu={menu}>
      <section>
        <header>
          <h1>{category.name} Posts</h1>
        </header>
        <ul>{postList}</ul>
      </section>
    </Layout>
  );
};

export default Category;

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const menu = await getMenu();
  const categories = await service.getCategories(params?.slug);
  const category = categories[0];
  const moviesCat = service.getTypeByCategory("movies", category.id);
  const postsCat = service.getTypeByCategory("posts", category.id);
  const posts = (await Promise.all([moviesCat, postsCat])).flat();

  return { props: { category, posts, ...menu } };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const allCategories = await service.getCategories();

  return {
    paths: allCategories.map(({ slug }) => `/category/${slug}`) || [],
    fallback: true,
  };
};
