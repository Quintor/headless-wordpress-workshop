import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import { WithRouterProps } from 'next/router';
import { Component } from 'react';
import Layout from '../components/Layout';
import { Config } from '../config';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import { IWPErrorResponse } from '../types/error';
import { IWpPost } from '../types/post';

interface IPageQuery {
  id: string;
  wpnonce: string;
}

interface IPreviewProps extends IMenuProps, WithRouterProps<IPageQuery> {
  url: {
    query: {
      [key: string]: string;
    };
  };
}

interface IPreviewState {
  post?: IWpPost;
  error?: IWPErrorResponse;
}

class Preview extends Component<IPreviewProps, IPreviewState> {
  constructor(props: IPreviewProps) {
    super(props);
    this.state = {
      post: undefined
    };
  }

  public componentDidMount() {
    const { id, wpnonce } = this.props.url.query;
    fetch(
      `${
        Config.apiUrl
      }/wp-json/headless/v1/post/preview?id=${id}&_wpnonce=${wpnonce}`,
      { credentials: 'include' } // required for cookie nonce auth
    )
      .then(res => res.json())
      .then(res => {
        if (res.code || res.code === 'rest_cookie_invalid_nonce') {
          this.setState({
            error: res
          });
        } else {
          this.setState({
            post: res
          });
        }
      });
  }

  public render() {
    const { headerMenu } = this.props;
    const { post, error } = this.state;

    if (error) {
      return <Error statusCode={error.data.status || 404} />;
    }

    return (
      <Layout menu={headerMenu}>
        <h1>{post ? post.title.rendered : ''}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post ? post.content.rendered : ''
          }}
        />
      </Layout>
    );
  }
}

export default withHeaderMenu(Preview);
