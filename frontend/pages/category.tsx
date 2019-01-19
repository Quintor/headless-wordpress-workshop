import { NextContext } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import React, { Component, FC } from 'react';
import Layout from '../components/Layout';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import { IWpCategory } from '../types/category';
import { IWpPost } from '../types/post';
import PostLink from '../components/PostLink';

interface IOwnProps {
  categories: IWpCategory[];
  posts?: IWpPost[];
}

type IProps = IOwnProps & IMenuProps;

class Category extends Component<IProps> {
  public static async getInitialProps(context: NextContext) {
    const { slug } = context.query;
    const categories = await service.getCategories(slug);
    if (categories.length > 0) {
      const posts = await service.getPostByCategory(categories[0].id);
      return { categories, posts };
    }
    return { categories };
  }

  public render() {
    if (this.props.categories.length === 0) {
      return <Error statusCode={404} />;
    }

    const posts =
      this.props.posts &&
      this.props.posts.map(post => <PostLink key={post.id} post={post} />);
    return (
      <Layout menu={this.props.headerMenu}>
        <h1>{this.props.categories[0].name} Posts</h1>
        <ul>{posts}</ul>
      </Layout>
    );
  }
}

export default withHeaderMenu(Category);
