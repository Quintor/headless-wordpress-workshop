import { NextComponentType, NextContext } from 'next';
import { Component } from 'react';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';

export interface IMenuProps {
  headerMenu: IWpMenu;
}

const withHeaderMenu = <P extends {}>(
  Page: NextComponentType<P & IMenuProps, P>
) => {
  return class extends Component<P & IMenuProps> {
    public static async getInitialProps(context: NextContext) {
      const headerMenu = await service.getMenu();
      return {
        headerMenu,
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : null)
      };
    }

    public render() {
      return <Page {...this.props} />;
    }
  };
};

export default withHeaderMenu;
