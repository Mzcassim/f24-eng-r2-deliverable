import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useState } from "react";

interface Species {
  id: number;
  scientific_name: string;
  common_name: string | null;
  kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria" | undefined;
  total_population: number | null;
  description: string | null;
}

export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const supabase = createBrowserSupabaseClient();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Deleted",
      description: `Species "${species.scientific_name}" was deleted.`,
    });

    setOpen(false); // Close dialog after successful deletion
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the species &quot;{species.scientific_name}&quot;? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => void handleDelete()}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
