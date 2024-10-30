import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "@/components/posts/PostMoreButton";
import UserAvatar from "@/components/UserAvatar";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium transition duration-200 hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground transition duration-200 hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {user?.id === post.user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
