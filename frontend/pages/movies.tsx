import Error from 'next/error';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import withPageMenu from '../components/PageWrapper';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';
import { IWpPost } from '../types/post';

interface IMovieModel {
  rating: string;
  release_year: string;
  description: string;
}
interface IProps {
  movie: IWpPost<IMovieModel>;
  headerMenu: IWpMenu;
}

class Movie extends Component<IProps> {
  public static async getInitialProps(context: any) {
    const { slug, apiRoute } = context.query;
    const movie = await service.getPost<IMovieModel>(apiRoute, slug);
    return { movie };
  }

  public render() {
    if (!this.props.movie.title) {
      return <Error statusCode={404} />;
    }

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

export default withPageMenu(Movie);
