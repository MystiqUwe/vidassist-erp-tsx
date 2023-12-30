"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { Input } from "./ui/input";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: string;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url, supabase]);

  async function downloadImage(path: string) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      return "";
    }

    const url = URL.createObjectURL(data);
    setAvatarUrl(url);
    return url;
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {false ? ( //avatarUrl
        <Image
          width={size}
          height={size}
          src={avatarUrl || ""}
          alt="Avatar"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }}>
          No Image
        </div>
      )}
      <div style={{ width: 150 }}>
        <Input
          disabled={uploading}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
        />
      </div>
    </>
  );
}
