import { useEffect, useState } from "react";

const Bookmarks = () => {

  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(data);
  }, []);

  const removeBookmark = (index: number) => {
    const updated = [...bookmarks];
    updated.splice(index, 1);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">Bookmarked Questions</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet</p>
      ) : (
        bookmarks.map((q, i) => (
          <div key={i} className="border p-4 rounded flex justify-between">

            <div>
              <p className="font-semibold">{q.question}</p>
              <p className="text-sm text-gray-500">
                {q.category} • {q.difficulty}
              </p>
            </div>

            <button
              onClick={() => removeBookmark(i)}
              className="text-red-500"
            >
              ❌
            </button>

          </div>
        ))
      )}

    </div>
  );
};

export default Bookmarks;