import { Component } from 'react';
import Layout from '../components/Layout';
import PostLink from '../components/PostLink';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import styles from '../styles/index.scss';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

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
    const posts = this.props.posts.map(post => (
      <li key={post.id}>
        <PostLink post={post} apiRoute="post" />
      </li>
    ));

    const pages = this.props.pages.map(page => (
      <li key={page.id}>
        <PostLink post={page} apiRoute="page" />
      </li>
    ));

    return (
      <Layout menu={this.props.headerMenu}>
        <picture>
          <source
            type="image/webp"
            srcSet="/static/images/Star-wars-logo-new-tall.webp"
          />
          <source
            type="image/png"
            srcSet="/static/images/Star-wars-logo-new-tall.png"
          />
          <img
            className="headerImageStyle"
            src="/static/images/Star-wars-logo-new-tall.png"
          />
        </picture>
        <h1>Hello</h1>
        <p className={styles.example}>World</p>
        <h2>Posts</h2>
        <ul>{posts}</ul>
        <h2>Pages</h2>
        <ul>{pages}</ul>
        <style jsx={true}>{`
          .headerImageStyle {
            margin-bottom: 50px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default withHeaderMenu(Index);
