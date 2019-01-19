import Error from "next/error";
import React, { Component } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import service from "../services/wordpress.service";
import { WpMenuItem } from "../types/menu";
import { WpPost } from "../types/post";
import PageWrapper from "../components/PageWrapper";

interface IProps {
  post: WpPost;
  headerMenu: {
    items: WpMenuItem[];
  };
}

class Post extends Component<IProps> {
  static async getInitialProps(context: any) {
    const { slug, apiRoute } = context.query;
    const post = await service.getPost(apiRoute, slug);
    return { post };
  }

  render() {
    if (!this.props.post.title) return <Error statusCode={404} />;

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

export default PageWrapper(Post);
