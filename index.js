let cameras = {};

function makeJSON(text) {
  // remove empty spaces
  const str = text.split(" ").join("");
  // make an array
  let stats = str.match(/([a-zA-Z]+)\s?\:\s?([^\n]+)/g);
  // remove first line
  stats = stats.slice(1);

  let obj = {},
    i = -1;
  // go through all elements in the array and add them to the object
  stats.forEach((stats) => {
    if (stats.includes("Index")) {
      i++;
      obj[i] = {};
    }
    const [key, val] = stats.split(":").map((s) => s.trim());
    if (key === "Size") {
      if (!obj[i].Sizes) obj[i].Sizes = [];
      obj[i].Sizes.push([{ [key]: val }]);
    } else if (key === "Interval") {
      obj[i].Sizes[obj[i].Sizes.length - 1].push({ [key]: val });
    } else {
      obj[i][key] = val;
    }
  });
  // look for length of cameras obj and add new objects without replacing existing ones
  const camerasLength = Object.keys(cameras).length;
  cameras[camerasLength] = obj;

  // turn object into JSON
  let convertedObject = JSON.stringify(cameras, null, camerasLength);
  console.log(convertedObject);
  return convertedObject;
}

console.log(cameras);

makeJSON(
  "ioctl: VIDIOC_ENUM_FMT\n\tIndex       : 0\n\tType        : Video Capture\n\tPixel Format: 'MJPG' (compressed)\n\tName        : Motion-JPEG\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n\tIndex       : 1\n\tType        : Video Capture\n\tPixel Format: 'YUYV'\n\tName        : YUYV 4:2:2\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n"
);

makeJSON(
  "ioctl: VIDIOC_ENUM_FMT\n\tIndex       : 2\n\tType        : Video Capture\n\tPixel Format: 'MJPG' (compressed)\n\tName        : Motion-JPEG\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n\tIndex       : 3\n\tType        : Video Capture\n\tPixel Format: 'YUYV'\n\tName        : YUYV 4:2:2\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n"
);
