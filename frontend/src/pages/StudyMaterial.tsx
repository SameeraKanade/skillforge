import { useEffect, useState } from "react";

// ✅ Proper Type (IMPORTANT)
type Video = {
  id: number;
  title: string;
  category: string;
  url: string;
};

const StudyMaterial = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/material")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setVideos([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load videos");
        setLoading(false);
      });
  }, []);

  // ✅ PRODUCTION-LEVEL YOUTUBE PARSER
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      // youtube.com/watch?v=VIDEO_ID
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : "";
      }

      // youtu.be/VIDEO_ID
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }

      // already embed link
      if (url.includes("embed/")) {
        return url;
      }

      return "";
    } catch {
      return "";
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Study Materials
      </h2>

      {/* ✅ Loading */}
      {loading && <p>Loading videos...</p>}

      {/* ✅ Error */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* ✅ Empty state */}
      {!loading && videos.length === 0 && !error && (
        <p>No videos available</p>
      )}

      {/* ✅ Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {videos.map((video) => {
          const embedUrl = getEmbedUrl(video.url);

          return (
            <div
              key={video.id}
              className="p-4 border rounded-xl shadow"
            >

              <h3 className="text-lg font-semibold">
                {video.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {video.category}
              </p>

              {embedUrl ? (
                <iframe
                  width="100%"
                  height="250"
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              ) : (
                <p className="text-red-400 text-sm">
                  Invalid video URL
                </p>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default StudyMaterial;