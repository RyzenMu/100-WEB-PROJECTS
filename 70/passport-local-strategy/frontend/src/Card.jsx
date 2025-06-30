import React, { useState } from "react";

export default function Card() {
  const [like, setLike] = useState(false)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" w-[500px] overflow-hidden border">
        <div className="border-b h-[75px] flex justify-center items-center text-5xl">
          Name : Rohit
        </div>
        <div className=" h-[350px] flex justify-center items-center ">
          <img src="../src/rohit.png" alt="rohit" className=" max-w-full max-height-[300px] object-contain" />
        </div>
        <div className="border-t h-[75px]" onClick={() =>setLike(like => !like)}>heart {like ? 'true' : 'false'}</div>
      </div>
    </div>
  );
}
 