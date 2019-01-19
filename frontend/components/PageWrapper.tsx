import { Component, ComponentType } from 'react';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';

type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
type WpComponentType<P = {}> = ComponentType<P> & {
  getInitialProps?: (args?: any) => Promise<Omit<P, 'headerMenu'>>;
};

function withPageMenu<TProps>(Comp: WpComponentType<TProps>) {
  return class extends Component<TProps & { headerMenu: IWpMenu }> {
    public static async getInitialProps(args: any) {
      const headerMenu = await service.getMenu();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    public render() {
      return <Comp {...this.props} />;
    }
  };
}

export default withPageMenu;
