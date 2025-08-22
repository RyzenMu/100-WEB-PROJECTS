import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaTrash, FaCopy, FaEdit } from "react-icons/fa";

// Supabase setup
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk`; // your full key
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("foods")
        .list("public", { limit: 100 });

      if (error) {
        console.error("Error fetching images:", error);
      } else {
        const jpgImages = data.filter((file) => file.name.endsWith(".jpg"));

        const urls = jpgImages.map((file) => {
          return supabase.storage
            .from("foods")
            .getPublicUrl(`public/${file.name}`).data.publicUrl;
        });

        setImages(urls);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = (url) => {
    alert(`Delete clicked for ${url}`);
    const deleteImages = async () => {
      const fileName = url.split("/").pop();
      const { error } = await supabase.storage
        .from("foods")
        .remove([`public/${fileName}`]);
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        // Refesh images after delete
        setImages((prev) => prev.filter((img) => img !== url));
      }
    };
    deleteImages();
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert(`Copied URL: ${url}`);
  };

  const handleEdit = (url) => {
    alert(`Edit clicked for ${url}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "50px",
        backgroundColor: "lightslategray",
        padding: "20px",
      }}
    >
      {images.map((url, index) => (
        <div
          key={index}
          style={{
            width: "300px",
            margin: "10px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={url}
            alt={`Image ${index}`}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px",
              background: "#f7f7f7",
            }}
          >
            <FaTrash
              style={{ cursor: "pointer" }}
              size={24}
              color="red"
              onClick={() => handleDelete(url)}
            />
            <FaCopy
              style={{ cursor: "pointer" }}
              size={24}
              color="blue"
              onClick={() => handleCopy(url)}
            />
            <FaEdit
              style={{ cursor: "pointer" }}
              size={24}
              color="green"
              onClick={() => handleEdit(url)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;