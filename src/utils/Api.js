import axios from "axios";
import toast from 'react-hot-toast';
const BaseUrl = "https://techhk.aoscdn.com";
const apiKey = import.meta.env.VITE_API_KEY;

export const GetEnhancedImg = async (file) => {
  try {
    
    toast.loading("Uploading image...");
    const taskId = await UploadImg(file);
    if (!taskId) throw new Error("Upload failed");

    toast.loading("Enhancing image...");
    const result = await pollForResult(taskId);

    toast.success("Image enhanced successfully!");
    return result;
  } catch (error) {
    toast.error("Error: " + error.message);
    return null;
  }
};

const UploadImg = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const { data } = await axios.post(
      `${BaseUrl}/api/tasks/visual/scale`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": apiKey,
        },
      }
    );

    const task_id = data?.data?.task_id;
    if (!task_id) throw new Error("Task ID not found in response");

    console.log("Upload success:", task_id);
    return task_id;
  } catch (err) {
    console.error("Upload failed:", err.message);
    return null;
  }
};

const GetImage = async (task_id) => {
  try {
    const { data } = await axios.get(
      `${BaseUrl}/api/tasks/visual/scale/${task_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      }
    );

    const result = data?.data;
    if (!result) throw new Error("Image data not found");

    return result;
  } catch (error) {
    console.error("Error Getting The Enhanced Image:", error.message);
    return null;
  }
};

//Polling Mechanism!
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const pollForResult = async (task_id, retries = 10, interval = 3000) => {
  for (let i = 0; i < retries; i++) {
    const result = await GetImage(task_id);
    if (result?.image) {
      return result; // ✅ Success
    }
    console.log(`Waiting... (${i + 1})`);
    await wait(interval);
  }
  throw new Error("Image processing timed out.");
};
