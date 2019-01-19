import Error from "next/error";
import Link from "next/link";
import React, { Component } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import PageWrapper from "../components/PageWrapper";
import service from "../services/wordpress.service";
import { WpCategory } from "../types/category";
import { WpMenu } from "../types/menu";
import { WpPost } from "../types/post";

interface IProps {
  categories: WpCategory[];
  posts: WpPost[];
  headerMenu: WpMenu;
}

class Category extends Component<IProps> {
  static async getInitialProps(context: any) {
    const { slug } = context.query;
    const categories = await service.getCategories(slug);
    if (categories.length > 0) {
      const posts = await service.getPostByCategory(categories[0].id);
      return { categories, posts };
    }
    return { categories };
  }
  render() {
    if (this.props.categories.length == 0) return <Error statusCode={404} />;

    const posts = this.props.posts.map((post, index) => {
      return (
        <ul key={index}>
          <li>
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=posts`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu menu={this.props.headerMenu} />
        <h1>{this.props.categories[0].name} Posts</h1>
        {posts}
      </Layout>
    );
  }
}

export default PageWrapper(Category);