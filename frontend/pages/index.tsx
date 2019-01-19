import Link from "next/link";
import React, { Component } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import PageWrapper from "../components/PageWrapper";
import service from "../services/wordpress.service";
import { WpMenuItem } from "../types/menu";
import { WpPage } from "../types/page";
import { WpPost } from "../types/post";

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50
};

interface IProps {
  pages: WpPage[];
  posts: WpPost[];
  headerMenu: {
    items: WpMenuItem[];
  };
}

class Index extends Component<IProps> {
  static async getInitialProps() {
    const posts = await service.getPosts();
    const pages = await service.getPages();

    return { posts, pages };
  }

  render() {
    const posts = this.props.posts.map(post => {
      return (
        <ul key={post.id}>
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
    const pages = this.props.pages.map(page => {
      return (
        <ul key={page.id}>
          <li>
            <Link
              as={`/page/${page.slug}`}
              href={`/post?slug=${page.slug}&apiRoute=pages`}
            >
              <a>{page.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu menu={this.props.headerMenu} />
        <img
          src="/static/images/wordpress-plus-react-header.png"
          width="815"
          style={headerImageStyle}
        />
        <h1>Hello</h1>
        <div>World</div>
        <h2>Posts</h2>
        {posts}
        <h2>Pages</h2>
        {pages}
      </Layout>
    );
  }
}

export default PageWrapper(Index);
