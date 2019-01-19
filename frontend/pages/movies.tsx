import { NextContext } from 'next';
import Error from 'next/error';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import { IWpPost } from '../types/post';

interface IMovieModel {
  rating: string;
  release_year: string;
  description: string;
}
interface IOwnProps {
  movie: IWpPost<IMovieModel>;
}

type IProps = IOwnProps & IMenuProps;

class Movie extends Component<IProps> {
  public static async getInitialProps(context: NextContext) {
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

export default withHeaderMenu(Movie);
