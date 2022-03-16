import Link from "next/link";
import { IWpPage } from "../types/page";
import { IWpPost } from "../types/post";

export default function PostLink({
  post,
  apiRoute,
}: {
  post: IWpPost | IWpPage;
  apiRoute?: string;
}) {
  return (
    <Link
      as={`/${post.type}/${post.slug}`}
      href={`/${post.type}?slug=${post.slug}&apiRoute=${apiRoute || post.type}`}
    >
      <a>{post.title.rendered}</a>
    </Link>
  );
}
