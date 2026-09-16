import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

async function run() {
  try {
    await new Promise((resolve, reject) => {
      try {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "test" },
          (error, result) => {
            if (error) {
              console.log("ASYNC ERROR", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(Buffer.from("hello"));
      } catch (err) {
        console.log("SYNC ERROR", err);
        reject(err);
      }
    });
  } catch (err) {
    console.log("CAUGHT", err);
  }
}

run();
