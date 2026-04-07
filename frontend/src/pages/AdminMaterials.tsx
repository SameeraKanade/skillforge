import { useEffect, useState } from "react";

// ✅ Type Safety
type Video = {
  id: number;
  title: string;
  category: string;
  url: string;
};

const AdminStudyMaterial = () => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  // ✅ Fetch videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/material");
      const data = await res.json();

      if (Array.isArray(data)) {
        setVideos(data);
      } else {
        setVideos([]);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Add video
  const handleAdd = async () => {

    if (!title || !category || !url) {
      alert("Fill all fields");
      return;
    }

    try {
      setAdding(true);

      await fetch("http://localhost:8080/api/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, category, url })
      });

      // Clear inputs
      setTitle("");
      setCategory("");
      setUrl("");

      fetchVideos();

    } catch (err) {
      console.error(err);
      alert("Failed to add video");
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete video
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/material/${id}`, {
        method: "DELETE"
      });

      fetchVideos();

    } catch (err) {
      console.error(err);
      alert("Failed to delete video");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Study Material Management
      </h2>

      {/* ✅ Error */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* ✅ Form */}
      <div className="space-y-3 mb-6">

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <button
          onClick={handleAdd}
          disabled={adding}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add Video"}
        </button>

      </div>

      {/* ✅ Loading */}
      {loading && <p>Loading videos...</p>}

      {/* ✅ Empty */}
      {!loading && videos.length === 0 && (
        <p>No videos added</p>
      )}

      {/* ✅ List */}
      <div className="space-y-3">

        {videos.map((v) => (
          <div
            key={v.id}
            className="border p-3 rounded flex justify-between items-center"
          >

            <div>
              <p className="font-semibold">{v.title}</p>
              <p className="text-sm text-gray-500">{v.category}</p>
            </div>

            <button
              onClick={() => handleDelete(v.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminStudyMaterial;