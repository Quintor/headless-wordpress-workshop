import Link from "next/link";
import { IWpPage } from "../types/page";
import { IWpPost } from "../types/post";

export default function PostLink({
  post,
}: {
  post: IWpPost | IWpPage;
}) {
  return (
    <Link href={`/${post.type}/${post.slug}`}>
      <a>{post.title.rendered}</a>
    </Link>
  );
}
