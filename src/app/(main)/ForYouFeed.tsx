"use client";

import Post from "@/components/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ForYouFeed = () => {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const response = await fetch("/api/posts/for-you");
      if (!response.ok) {
        throw new Error("Request failed with statusCode: " + response.status);
      }
      return response.json();
    },
  });

  if (query.status === "pending") {
    return <Skeleton className="h-32 bg-muted" />;
  }

  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <>
      {query.data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default ForYouFeed;
