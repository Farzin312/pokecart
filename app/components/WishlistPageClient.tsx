"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WishlistData } from "../type/Pokemon";
import { Button, ConfirmationModal } from "../components/reusable";

interface WishlistPageClientProps {
  data: WishlistData;
  userId: string;
}

export default function WishlistPageClient({ data, userId }: WishlistPageClientProps) {
  // Local state for "recently viewed" & "wishlist" so we can update without reload
  const [viewedImages, setViewedImages] = useState(data.recentlyViewed.images);
  const [viewedNames, setViewedNames] = useState(data.recentlyViewed.names);
  const [wishlist, setWishlist] = useState(data.wishlist);

  // For editing
  const [editWishlistId, setEditWishlistId] = useState<string | null>(null);
  const [newMerchandiseType, setNewMerchandiseType] = useState("");

  const [editViewedId, setEditViewedId] = useState<string | null>(null);
  const [newViewedName, setNewViewedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // For confirmation modals
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  // Helper to open a modal
  function openConfirmModal(message: string, onConfirm: () => void) {
    setConfirmMessage(message);
    setOnConfirmCallback(() => onConfirm); // store callback
    setConfirmModalOpen(true);
  }

  function closeConfirmModal() {
    setConfirmModalOpen(false);
    setConfirmMessage("");
    setOnConfirmCallback(null);
  }

  /**
   * Wishlist Deletion
   */
  function handleDeleteWishlist(itemId: string) {
    openConfirmModal("Are you sure you want to remove this wishlist item?", async () => {
      try {
        const res = await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId }),
        });
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error);
        }

        // Remove from local state
        setWishlist((prev) => prev.filter((w) => w.id !== itemId));
      } catch (error) {
        alert(`Failed to delete wishlist item: ${error}`);
      } finally {
        closeConfirmModal();
      }
    });
  }

  async function handleUpdateWishlist() {
    if (!editWishlistId) return;
    if (!newMerchandiseType.trim()) {
      alert("Please enter a new merchandise type.");
      return;
    }
    try {
      const res = await fetch("/api/wishlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: editWishlistId, newMerchandiseType }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      // Update local state
      setWishlist((prev) =>
        prev.map((w) =>
          w.id === editWishlistId ? { ...w, merchandiseType: newMerchandiseType } : w
        )
      );
      setEditWishlistId(null);
      setNewMerchandiseType("");
    } catch {
      alert("Failed to update wishlist item");
    }
  }

  /**
   * Viewed Pokémons Deletion
   */
  function handleDeleteViewed(pokemonId: string) {
    openConfirmModal("Are you sure you want to remove this viewed Pokémon?", async () => {
      try {
        const res = await fetch("/api/recentlyViewed", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, pokemonId }),
        });
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error);
        }
        // Remove from local state in both images & names
        setViewedImages((prev) => prev.filter((img) => img.id?.toString() !== pokemonId));
        setViewedNames((prev) => prev.filter((nm) => nm.id?.toString() !== pokemonId));
      } catch {
        alert("Failed to delete viewed Pokémon");
      } finally {
        closeConfirmModal();
      }
    });
  }

  async function handleUpdateViewed() {
    if (!editViewedId) return;
    if (!newViewedName.trim()) {
      alert("Please enter a new name.");
      return;
    }
    try {
      const res = await fetch("/api/recentlyViewed", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          pokemonId: editViewedId,
          newName: newViewedName,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      // Update local state
      setViewedNames((prev) =>
        prev.map((n) =>
          n.id?.toString() === editViewedId ? { ...n, name: newViewedName } : n
        )
      );
      setViewedImages((prev) =>
        prev.map((img) =>
          img.id?.toString() === editViewedId ? { ...img, name: newViewedName } : img
        )
      );
      setEditViewedId(null);
      setNewViewedName("");
    } catch {
      alert("Failed to update viewed Pokémon");
    }
  }

  // Filter logic
  const filteredViewedNames = viewedNames.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Wishlist count
  const wishlistCount = wishlist.length;
  const remaining = 10 - wishlistCount;

  return (
    <div className="w-full bg-gradient-to-br from-white to-yellow-50 px-4 py-8 flex flex-col space-y-6">
      {/* Confirmation Modal */}
      {confirmModalOpen && onConfirmCallback && (
        <ConfirmationModal
          title="Confirmation"
          message={confirmMessage}
          onConfirm={onConfirmCallback}
          onCancel={closeConfirmModal}
        />
      )}

      <h1 className="mx-auto text-3xl sm:text-5xl font-extrabold text-center">
        ⭐️ Your <span className="text-yellow-500">Pokémon Page</span> ⚡️
      </h1>

      {/* Mobile-friendly column approach; wishlist on the RIGHT for desktop */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT Column - Recently Viewed */}
        <div className="md:w-1/2 flex flex-col space-y-8">
          {/* Recently Viewed (Images) */}
          <section className="bg-white p-4 rounded-md shadow border border-yellow-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Recently <span className="text-yellow-500">Viewed 📸</span>
            </h2>
            {viewedImages.length === 0 ? (
              <p className="text-gray-700">No recently viewed Pokémon yet!</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {viewedImages.map((pokemon) => {
                  const pid = pokemon.id?.toString() || "";
                  return (
                    <div
                      key={pid}
                      className="w-28 sm:w-36 bg-yellow-50 rounded-md shadow p-2 flex flex-col items-center"
                    >
                      <Link href={`/products/${pokemon.name}`}>
                        <Image
                          src={pokemon.sprites?.front_default || "/fallback-image.png"}
                          alt={pokemon.name}
                          width={80}
                          height={80}
                          className="rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105 mx-auto"
                          unoptimized
                        />
                      </Link>
                      <p className="mt-2 text-center text-sm sm:text-lg font-semibold text-gray-800 capitalize">
                        {pokemon.name}
                      </p>
                      {/* No delete button for images per your request */}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Viewed Pokémons (Names) */}
          <section className="bg-white p-4 rounded-md shadow border border-yellow-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Viewed <span className="text-yellow-500">Pokémons 👀</span>
            </h2>

            {/* Search */}
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Search viewed Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-l px-3 py-1 focus:outline-none w-full"
              />
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="rounded-l-none"
              >
                Clear ❌
              </Button>
            </div>

            {filteredViewedNames.length === 0 ? (
              <p className="text-gray-700">
                No viewed Pokémon found for <strong>{searchTerm}</strong>.
              </p>
            ) : (
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300">
                <ul className="space-y-2">
                  {filteredViewedNames.map((pokemon) => {
                    const pid = pokemon.id?.toString() || "";
                    return (
                      <li
                        key={pid}
                        className="bg-yellow-50 rounded-md p-2 shadow flex justify-between items-center"
                      >
                        <Link
                          href={`/products/${pokemon.name}`}
                          className="hover:underline capitalize text-gray-800"
                        >
                          {pokemon.name}
                        </Link>
                        <div className="flex space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteViewed(pid)}
                          >
                            🗑️ Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditViewedId(pid);
                              setNewViewedName(pokemon.name);
                            }}
                          >
                            ✏️ Edit
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {/* Edit "Viewed" form */}
          {editViewedId && (
            <div className="bg-white p-4 rounded-md shadow border border-yellow-200">
              <h3 className="text-lg font-bold mb-2">
                Update <span className="text-yellow-500">Viewed Pokémon ✏️</span>
              </h3>
              <div className="flex space-x-2">
                <input
                  className="border border-gray-300 px-2 py-1 rounded w-1/2"
                  value={newViewedName}
                  onChange={(e) => setNewViewedName(e.target.value)}
                />
                <Button variant="default" onClick={handleUpdateViewed}>
                  Save 💾
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditViewedId(null);
                    setNewViewedName("");
                  }}
                >
                  Cancel ❌
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT Column - Wishlist */}
        <div className="md:w-1/2 bg-yellow-50 p-4 rounded-md shadow border border-yellow-200 flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Your <span className="text-yellow-500">Wishlist 💛</span>
          </h2>
          {remaining > 0 && (
            <p className="text-center text-sm text-gray-700 mb-2">
              You can add <strong>{remaining}</strong> more!
            </p>
          )}

          {wishlist.length === 0 ? (
            <p className="text-gray-700">
              Your wishlist is empty. Add some Pokémon merchandise to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-yellow-200 rounded-xl bg-white shadow-lg flex flex-col items-center space-y-2 cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <Link href={`/products/${item.pokemon.name}`}>
                    <div className="flex flex-col items-center">
                      <Image
                        src={item.pokemon.sprites?.front_default || "/placeholder.png"}
                        alt={item.pokemon.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full mb-2"
                      />
                      <h3 className="text-xl sm:text-2xl font-extrabold text-yellow-600 capitalize">
                        {item.pokemon.name}
                      </h3>
                      <p className="text-md sm:text-lg text-gray-600">
                        Merchandise:{" "}
                        <span className="font-semibold">🛍️ {item.merchandiseType}</span>
                      </p>
                    </div>
                  </Link>
                  {/* Buttons for Delete & Edit */}
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteWishlist(item.id)}
                    >
                      🗑️ Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditWishlistId(item.id);
                        setNewMerchandiseType(item.merchandiseType);
                      }}
                    >
                      ✏️ Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit wishlist form */}
          {editWishlistId && (
            <div className="mt-4 p-4 bg-white border border-yellow-200 rounded shadow">
              <h3 className="text-lg font-bold mb-2 text-center text-yellow-600">
                Update <span className="text-yellow-500">Merchandise ✏️</span>
              </h3>
              <div className="flex space-x-2 justify-center">
                <input
                  className="border border-gray-300 px-2 py-1 rounded w-1/2"
                  value={newMerchandiseType}
                  onChange={(e) => setNewMerchandiseType(e.target.value)}
                />
                <Button variant="default" onClick={handleUpdateWishlist}>
                  Save 💾
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditWishlistId(null);
                    setNewMerchandiseType("");
                  }}
                >
                  Cancel ❌
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
