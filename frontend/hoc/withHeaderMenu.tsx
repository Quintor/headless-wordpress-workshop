import { Component, ComponentType } from 'react';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';

export interface IMenuProps {
  headerMenu: IWpMenu;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WpComponentType<P extends IMenuProps = IMenuProps> = ComponentType<P> & {
  getInitialProps?: (args?: any) => Promise<Omit<P, 'headerMenu'>>;
};

function withHeaderMenu<TProps extends IMenuProps>(
  Comp: WpComponentType<TProps>
) {
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

export default withHeaderMenu;
