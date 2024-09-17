// species-detail-dialog.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the species type. You can adjust it based on your database schema.
interface Species {
  scientific_name: string;
  common_name: string | null;
  total_population: number | null;
  kingdom: string;
  description: string | null;
}

export default function SpeciesDetailDialogBox({ species }: { species: Species }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* This button will trigger the dialog */}
        <Button variant="secondary">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.common_name ?? species.scientific_name}</DialogTitle>
          <DialogDescription>Detailed information about the species:</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Scientific Name:</strong> {species.scientific_name}
          </p>
          <p>
            <strong>Common Name:</strong> {species.common_name ?? "N/A"}
          </p>
          <p>
            <strong>Kingdom:</strong> {species.kingdom}
          </p>
          <p>
            <strong>Total Population:</strong>{" "}
            {species.total_population ? species.total_population.toLocaleString() : "Unknown"}
          </p>
          <p>
            <strong>Description:</strong> {species.description ?? "No description available."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
