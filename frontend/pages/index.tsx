import Link from 'next/link';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import styles from '../styles/index.scss';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

const headerImageStyle = {
  marginBottom: 50,
  marginTop: 50
};

interface IOwnProps {
  pages: IWpPage[];
  posts: IWpPost[];
}

type IProps = IOwnProps & IMenuProps;

class Index extends Component<IProps> {
  public static async getInitialProps() {
    const posts = await service.getPosts();
    const pages = await service.getPages();

    return { posts, pages };
  }

  public render() {
    const posts = this.props.posts.map(post => {
      return (
        <li key={post.id}>
          <Link
            as={`/post/${post.slug}`}
            href={`/post?slug=${post.slug}&apiRoute=posts`}
          >
            <a>{post.title.rendered}</a>
          </Link>
        </li>
      );
    });
    const pages = this.props.pages.map(page => {
      return (
        <li key={page.id}>
          <Link
            as={`/page/${page.slug}`}
            href={`/post?slug=${page.slug}&apiRoute=pages`}
          >
            <a>{page.title.rendered}</a>
          </Link>
        </li>
      );
    });
    return (
      <Layout menu={this.props.headerMenu}>
        <img
          src="/static/images/wordpress-plus-react-header.png"
          width="815"
          style={headerImageStyle}
        />
        <h1>Hello</h1>
        <p className={styles.example}>World</p>
        <h2>Posts</h2>
        <ul>{posts}</ul>
        <h2>Pages</h2>
        <ul>{pages}</ul>
      </Layout>
    );
  }
}

export default withHeaderMenu(Index);
