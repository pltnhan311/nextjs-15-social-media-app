"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "@/components/posts/editor/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./styles.css";

const PostEditor = () => {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function handleSubmit() {
    await submitPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <Avatar className="cursor-pointer border-2 border-border">
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          <AvatarImage src={user.avatarUrl || ""} alt={user.displayName} />
        </Avatar>
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3 max-w-screen-md"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
