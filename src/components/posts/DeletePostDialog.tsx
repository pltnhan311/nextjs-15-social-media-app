import LoadingButton from "@/components/LoadingButton";
import { useDeletePost } from "@/components/posts/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostData } from "@/lib/types";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const deletePost = useDeletePost();

  const handleOpenChange = (open: boolean) => {
    if (!open || !deletePost.isPending) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure to delete this post?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deletePost.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={deletePost.isPending}
            variant="destructive"
            onClick={() => deletePost.mutate(post.id, { onSuccess: onClose })}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
