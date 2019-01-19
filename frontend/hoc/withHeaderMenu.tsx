import { NextContext } from 'next';
import { Component, ComponentType } from 'react';
import service from '../services/wordpress.service';
import { IWpMenu } from '../types/menu';

export interface IMenuProps {
  headerMenu: IWpMenu;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WpComponentType<P extends IMenuProps = IMenuProps> = ComponentType<P> & {
  getInitialProps?: (context: NextContext) => Promise<Omit<P, 'headerMenu'>>;
};

function withHeaderMenu<TProps extends IMenuProps>(
  Comp: WpComponentType<TProps>
) {
  return class extends Component<TProps & { headerMenu: IWpMenu }> {
    public static async getInitialProps(context: NextContext) {
      const headerMenu = await service.getMenu();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(context) : null)
      };
    }

    public render() {
      return <Comp {...this.props} />;
    }
  };
}

export default withHeaderMenu;
