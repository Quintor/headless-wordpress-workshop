import Link from 'next/link';
import { FC } from 'react';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

const PostLink: FC<{ post: IWpPost | IWpPage; apiRoute?: string }> = ({
  post,
  apiRoute
}) => (
  <li>
    <Link
      as={`/${post.type}/${post.slug}`}
      href={`/${post.type}?slug=${post.slug}&apiRoute=${apiRoute || post.type}`}
    >
      <a>{post.title.rendered}</a>
    </Link>
  </li>
);

export default PostLink;
