import {
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import service from "../services/wordpress.service";
import { IWpMenu } from "../types/menu";

export interface IMenuProps {
  headerMenu: IWpMenu;
}

export function withPageMenu<P extends {}>(
  gsp: GetStaticProps<P & IMenuProps>
) {
  return async (context: GetStaticPropsContext) => {
    const headerMenu = await service.getMenu();

    // Run `getStaticProps` to get page-specific data
    const gspData = (await gsp(context)) as {
      props: P;
      revalidate?: number | boolean;
    }; 

    // Pass page-specific props along with menu data from `withHeaderMenu` to component
    return {
      ...gspData,
      props: {
        ...gspData?.props,
        headerMenu,
      },
    };
  };
}
