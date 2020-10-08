import CustomPlayer from "./Video";

const videoSettings = {
  width: 500,
  height: 300,
  message: "Your browser does not support the video tag.",
};
const sources = [
  {
    type: "video/mp4",
    src:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    src:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.vp9.webm",
    type: "video/mp4",
  },
];

const video = new CustomPlayer(videoSettings);
video.setSources(sources);

const videoElement = video.render("player-1");

const app = document.getElementById("app")!;
app.innerHTML = videoElement;
