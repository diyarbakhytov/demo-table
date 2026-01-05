import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-svh w-full">
      <Spinner className="size-10" />
    </div>
  );
}
