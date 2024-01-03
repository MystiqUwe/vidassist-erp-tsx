"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeaderCreate = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push(`/dashboard/create-video`);
  };

  return (
    <Button variant="outline" onClick={onSubmit} type="submit">
      Create process
    </Button>
  );
};

export default HeaderCreate;
