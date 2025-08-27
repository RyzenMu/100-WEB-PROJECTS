import React, { useState } from "react";

const SUPABASE_URL = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const SUPABASE_BUCKET = "navelVideos";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk";

const VideoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Video selected:", file.name);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadMessage("Starting upload...");

    try {
      const uploadPath = `uploads/${Date.now()}_${selectedFile.name}`;

      const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/${SUPABASE_BUCKET}/${uploadPath}`,
        {
          method: "POST", // or PUT if you prefer
          headers: {
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": selectedFile.type || "video/mp4",
          },
          body: selectedFile,
        }
      );

      if (response.ok) {
        console.log("✅ Upload successful");
        setUploadMessage("✅ Upload completed successfully!");
      } else {
        const error = await response.text();
        console.error("❌ Upload failed:", response.status, error);
        setUploadMessage(`❌ Upload failed: ${response.status} - ${error}`);
      }
    } catch (err: any) {
      console.error("❌ Network error:", err);
      setUploadMessage(`❌ Network error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Navel Videos Uploader</h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        style={{ display: "block", marginBottom: "1rem" }}
      />

      {selectedFile && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p>Selected: {selectedFile.name}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              width: "100%",
              padding: "0.5rem",
              background: uploading ? "#ccc" : "#6200ee",
              color: "white",
              border: "none",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? "Uploading..." : "Upload to Supabase"}
          </button>
        </div>
      )}

      {uploadMessage && (
        <div
          style={{
            padding: "1rem",
            background: uploadMessage.includes("✅")
              ? "#d1e7dd"
              : uploadMessage.includes("❌")
              ? "#f8d7da"
              : "#e2e3e5",
          }}
        >
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
