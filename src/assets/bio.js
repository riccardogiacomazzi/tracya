const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://tracya-av.web.app/";

const bio = {
  text: "Tracya is a project that combines electronic music and visual arts. The distinctive blend of ambient, dub, and acid elements allows me to create imaginary soundscapes and layers, transporting the listener to distant dimensions where sound acts as a force that propels them into orbit. The mix of genres typical of my compositions ranges from downtempo to techno. The deeply rooted glitch imprint of the visual sets blends with the sound, creating a pattern of abstract images and shapes in constant and unpredictable evolution.",
  visualArt:
    "Tracya's aesthetic is deeply rooted in glitch art and takes inspiration from corrupted images and noisy textures. In order to achieve my aestethic, I use a wide range of devices and tools such as: analog and digital cameras, old camcorders, DIY analog video generators, and TouchDesigner.",
  pics: [
    {
      url: "https://live.staticflickr.com/65535/53908701183_e863008b26_o.jpg",
    },
    {
      url: "https://live.staticflickr.com/65535/53908701198_ce7acb3cd8_o.jpg",
    },
  ],
  contacts: [
    { name: "Instagram", link: "https://www.instagram.com/tracya.av/" },
    { name: "SoundCloud", link: "https://soundcloud.com/tracya0000" },
    { name: "Discogs", link: "https://www.discogs.com/artist/4772215-Tracya" },
    { name: "Mail", link: "mailto:tracya0000@gmail.com" },
    { name: "Archive", link: `${baseUrl}/archive` },

    { name: "Web Design", link: "mailto:riccardogiacomazzi93@gmail.com" },
  ],
};

export default bio;
