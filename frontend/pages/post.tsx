import { NextContext } from 'next';
import Error from 'next/error';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import { IWpPost } from '../types/post';

interface IOwnProps {
  post: IWpPost;
}

type IProps = IOwnProps & IMenuProps;

class Post extends Component<IProps> {
  public static async getInitialProps(context: NextContext) {
    const { slug, apiRoute } = context.query;
    const post = await service.getPost(apiRoute, slug);
    return { post };
  }

  public render() {
    if (!this.props.post.title) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout menu={this.props.headerMenu}>
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

export default withHeaderMenu(Post);
