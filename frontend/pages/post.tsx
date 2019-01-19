import Error from 'next/error';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import withPageMenu from '../components/PageWrapper';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';
import { IWpPost } from '../types/post';

interface IProps {
  post: IWpPost;
  headerMenu: IWpMenu;
}

class Post extends Component<IProps> {
  public static async getInitialProps(context: any) {
    const { slug, apiRoute } = context.query;
    const post = await service.getPost(apiRoute, slug);
    return { post };
  }

  public render() {
    if (!this.props.post.title) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <Menu menu={this.props.headerMenu} />
        <h1>{this.props.post.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.post.content.rendered
          }}
        />
      </Layout>
    );
  }
}

export default withPageMenu(Post);
