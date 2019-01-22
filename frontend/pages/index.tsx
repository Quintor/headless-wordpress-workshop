import { Component } from 'react';
import Layout from '../components/Layout';

interface IOwnProps {
  title: string;
}

type IProps = IOwnProps;

class Index extends Component<IProps> {
  public static async getInitialProps() {
    return { title: 'Hello Headless CMS!' };
  }

  public render() {
    return (
      <Layout>
        <h1>{this.props.title}</h1>
      </Layout>
    );
  }
}

export default Index;
