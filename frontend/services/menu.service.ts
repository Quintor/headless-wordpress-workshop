import { IMenuProps } from "../components/Menu";
import service from "../services/wordpress.service";

export async function getMenu(): Promise<IMenuProps> {
  let result: IMenuProps = {};
  try {
    result = { menu: await service.getMenu() };
  } catch (e) {
    console.warn(`Failed to load menu`, e);
  }
  return result;
}
