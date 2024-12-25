import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { AlbumData } from "albums";

interface AlbumInfoProps {
  albumData: AlbumData;
}

export default function AlbumInfo({ albumData }: AlbumInfoProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState<boolean | null>(null);

  async function saveAlbum() {
    if (!albumData?.id) {
      console.error("Album ID is undefined");
      return;
    }

    setIsSaving(true);
    setSaveSuccess(null);

    try {
      const res = await fetch(
        `/api/spotify-data?endpoint=save-album&albumId=${albumData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSaveSuccess(data.success);
    } catch {
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  }

  async function removeAlbum() {
    if (!albumData?.id) {
      console.error("Album ID is undefined");
      return;
    }

    setIsRemoving(true);
    setRemoveSuccess(null);

    try {
      const res = await fetch(
        `/api/spotify-data?endpoint=remove-album&albumId=${albumData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRemoveSuccess(data.success);
    } catch {
      setRemoveSuccess(false);
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <section className="album-info flex items-center space-x-6 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl">
      <Image
        src={albumData.imageUrl}
        alt={albumData.name}
        width={96}
        height={96}
        className="object-cover rounded-lg shadow-lg"
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          {albumData.name}
        </h1>
        <p className="text-gray-400 text-sm">
          {albumData.release_date} &bull; {albumData.total_tracks} tracks
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <Button
            onClick={saveAlbum}
            isLoading={isSaving}
            success={saveSuccess}
            text="Save Album"
            className="transition-transform transform hover:scale-105"
          />
          <Button
            onClick={removeAlbum}
            isLoading={isRemoving}
            success={removeSuccess}
            text="Remove Album"
            className="transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
