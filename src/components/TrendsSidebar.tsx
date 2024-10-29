import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React, { Suspense } from "react";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.15rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Skeleton className="h-64 w-full bg-muted" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

async function WhoToFollow() {
  const { user } = await validateRequest();
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: userDataSelect,
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Who to follow</h2>
      {usersToFollow.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}

interface IUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  key: string;
}
function UserCard({ id, username, displayName, avatarUrl }: IUser) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link href={`/users/${username}`} className="flex items-center gap-3">
        <UserAvatar avatarUrl={avatarUrl} className="flex-none" />
        <div>
          <p className="line-clamp-1 break-all font-semibold hover:underline">
            {displayName}
          </p>
          <p className="line-clamp-1 break-all text-muted-foreground">
            @{username}
          </p>
        </div>
      </Link>
      <Button className="text-sm">Follow</Button>
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="font-semibold text-xl">Trending topics</h2>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];
        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default TrendsSidebar;
