import { ComponentType, Component } from "react";
import service from "../services/wordpress.service";

type WpComponentType<P = {}> = ComponentType<P> & {
  getInitialProps?: Function;
};

const PageWrapper = function<TProps>(Comp: WpComponentType<TProps>) {
  return class extends Component<TProps> {
    static async getInitialProps(args: any) {
      const headerMenu = await service.getMenu();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
};

export default PageWrapper;
