let cameras = {};

function makeJSON(text) {
  // remove empty spaces
  const str = text.replace(/ +(?= )/g, "");
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
      let Intervals = [val];
      let newValue = val.split(" ");
      Intervals.push(...newValue);
      Intervals.splice(0, 1);
      const finalValues = [];
      for (let i = 0; i < Intervals.length; i += 4) {
        if (!Intervals[i + 3]) break;
        finalValues.push(
          `${Intervals[i]} ${Intervals[i + 1]} ${Intervals[i + 2]} ${
            Intervals[i + 3]
          }`
        );
      }

      obj[i].Sizes[obj[i].Sizes.length - 1].push({ Intervals: finalValues });
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
  "ioctl: VIDIOC_ENUM_FMT\n\tIndex       : 0\n\tType        : Video Capture\n\tPixel Format: 'MJPG' (compressed)\n\tName        : Motion-JPEG\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps) Discrete 0.017s (60.000 fps) Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps) \n\n\tIndex       : 1\n\tType        : Video Capture\n\tPixel Format: 'YUYV'\n\tName        : YUYV 4:2:2\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n"
);

// makeJSON(
//   "ioctl: VIDIOC_ENUM_FMT\n\tIndex       : 2\n\tType        : Video Capture\n\tPixel Format: 'MJPG' (compressed)\n\tName        : Motion-JPEG\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n\tIndex       : 3\n\tType        : Video Capture\n\tPixel Format: 'YUYV'\n\tName        : YUYV 4:2:2\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.017s (60.000 fps)\n\n"
// );

makeJSON(
  "ioctl: VIDIOC_ENUM_FMT\n\tIndex       : 0\n\tType        : Video Capture\n\tPixel Format: 'MJPG' (compressed)\n\tName        : Motion-JPEG\n\t\tSize: Discrete 2320x1744\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 4656x3496\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 4208x3120\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 4160x3120\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 4000x3000\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 3264x2448\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 2592x1944\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 2048x1536\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1600x1200\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1280x960\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1024x768\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 800x600\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 640x480\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 2320x1744\n\t\t\tInterval: Discrete 0.033s (30.000 fps)\n\t\t\tInterval: Discrete 0.040s (25.000 fps)\n\t\t\tInterval: Discrete 0.050s (20.000 fps)\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\n\tIndex       : 1\n\tType        : Video Capture\n\tPixel Format: 'YUYV'\n\tName        : YUYV 4:2:2\n\t\tSize: Discrete 2320x1744\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 4656x3496\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 3840x2160\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 3264x2448\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 2592x1944\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 2048x1536\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\t\tSize: Discrete 1920x1080\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1600x1200\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1280x960\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1280x720\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 1024x768\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\t\tInterval: Discrete 0.200s (5.000 fps)\n\t\tSize: Discrete 800x600\n\t\t\tInterval: Discrete 0.067s (15.000 fps)\n\t\t\tInterval: Discrete 0.100s (10.000 fps)\n\t\tSize: Discrete 2320x1744\n\t\t\tInterval: Discrete 1.000s (1.000 fps)\n\n"
);
