import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { IMenuProps } from "../../components/Menu";
import PostLink from "../../components/PostLink";
import { getMenu } from "../../services/menu.service";
import service from "../../services/wordpress.service";
import { IWpCategory } from "../../types/category";
import { IWpPost } from "../../types/post";

interface IOwnProps {
  categories: IWpCategory[];
  posts: { [key: number]: IWpPost[] };
}

type IProps = IOwnProps & IMenuProps;

const Categories: NextPage<IProps> = ({ categories, posts, menu }) => {
  const router = useRouter();

  const hasCategories = categories.length > 0;
  const postList = (posts: IWpPost[]) =>
    posts.map((post) => (
      <li key={post.id}>
        <PostLink post={post} />
      </li>
    ));

  const categoryList = categories.map((category) => (
    <section key={category.id}>
      <h2>
        <Link href={`/category/${category.slug}`}>
          <a>{category.name}</a>
        </Link>
      </h2>
      <ul>{postList(posts[category.id])}</ul>
    </section>
  ));

  return (
    <Layout menu={menu}>
      <section>
        <header>
          <h1>All categories</h1>
          {!hasCategories && <p>No categories found</p>}
        </header>
        {hasCategories && categoryList}
      </section>
    </Layout>
  );
};

export default Categories;

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const menu = await getMenu();
  const categories = await service.getCategories();
  const postsInCategoriesResponses = categories.map(async (category) => ({
    categoryId: category.id,
    posts: await Promise.all([
      service.getTypeByCategory("posts", category.id),
      service.getTypeByCategory("movies", category.id),
    ]),
  }));
  const postsInCategories = await Promise.all(postsInCategoriesResponses);
  const posts: { [key: number]: IWpPost[] } = {};
  for (const postsInCategory of postsInCategories) {
    posts[postsInCategory.categoryId] = postsInCategory.posts.flat();
  }

  return { props: { categories, posts, ...menu } };
};
