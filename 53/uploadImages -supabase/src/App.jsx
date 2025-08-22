// supabase
import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { data, error } = await supabase.storage.from("foods").upload(filePath, file);
    if (error) {
      console.error("Upload error", error.message);
    } else {
      console.log("upload successfully", data);
      const { data: publicUrlData } = supabase.storage
        .from("foods")
        .getPublicUrl(filePath);
      setUrl(publicUrlData.publicUrl);
    }
  };
  return (
    <div className="App">
      <h1>Upload Images</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br></br>
      <br></br>
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={url} alt="Uploaded" width={"200"} />
        </div>
      )}
    </div>
  );
}
