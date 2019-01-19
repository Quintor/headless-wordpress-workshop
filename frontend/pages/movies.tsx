import Error from "next/error";
import React, { Component } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import service from "../services/wordpress.service";
import { WpMenuItem } from "../types/menu";
import { WpPost } from "../types/post";
import PageWrapper from "../components/PageWrapper";

interface MovieModel {
  rating: string;
  release_year: string;
  description: string;
}
interface IProps {
  movie: WpPost<MovieModel>;
  headerMenu: {
    items: WpMenuItem[];
  };
}

class Movie extends Component<IProps> {
  static async getInitialProps(context: any) {
    const { slug, apiRoute } = context.query;
    const movie = await service.getPost(apiRoute, slug);
    return { movie };
  }

  render() {
    if (!this.props.movie.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={this.props.headerMenu} />
        <h1>{this.props.movie.title.rendered}</h1>
        <h3>{this.props.movie.acf.release_year}</h3>
        <h3>{this.props.movie.acf.rating}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.movie.acf.description
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Movie);
