# GLoiART — GitHub Pages Website

A free, static artwork portfolio/shopfront for GLoiART.

## What is included

- Responsive gallery with **2 artworks per row on desktop and mobile**
- Artwork images use `width: 100%` + `height: auto`, so they **keep their original aspect ratio**
- Each artwork has:
  - title
  - brief description
  - availability
  - WhatsApp enquiry button
  - expandable "View artwork" section
  - artwork story
  - process video
  - print availability
- Hero/banner section
- About the Artist
- About GLoiART video section
- Nature-inspired visual design
- No server/database required

## Before publishing

### 1. Add your WhatsApp number

Open `config.js` and change:

```js
const WHATSAPP_NUMBER = "237XXXXXXXXX";
```

to your full WhatsApp number without `+`, spaces or brackets.

Example format:

```js
const WHATSAPP_NUMBER = "2376XXXXXXXX";
```

### 2. Add your artwork images

Put your artwork files in:

`assets/artworks/`

Then edit the `ARTWORKS` list in `config.js`.

For example:

```js
{
  title: "My Artwork",
  description: "A short description.",
  image: "assets/artworks/my-artwork.jpg",
  availability: "Original available",
  original: true,
  processVideo: "assets/videos/my-artwork-process.mp4",
  story: "The story behind the artwork.",
  print: "A4 and A3 prints available. Contact me for price."
}
```

**Important:** Do not resize/crop the image in your image editor just for the website. The site displays each image proportionally.

### 3. Add your process videos

Put MP4 files in:

`assets/videos/`

The website already points each artwork to a process-video filename. Change those filenames in `config.js` to match your videos.

For the About GLoiART section, replace:

`assets/videos/about-gloliart.mp4`

with your actual video.

### 4. Replace the sample banner

The supplied hero is an editable CSS illustration so the website works immediately without depending on another image host.

If you want a real photographic banner later, replace the `.hero-art` section in `index.html`/`styles.css` with your own image.

## Publish for free with GitHub Pages

1. Create a GitHub account at https://github.com if you don't already have one.
2. Create a new repository.
3. A good repository name is:
   `gloiart`
4. Upload everything inside this folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `config.js`
   - `assets/`
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
7. Save.
8. GitHub will give you a Pages address similar to:
   `https://YOUR-USERNAME.github.io/gloiart/`

## If you want the shorter address

Create the repository using your GitHub username followed by `.github.io`, for example:

`YOUR-USERNAME.github.io`

Then the website can be available at:

`https://YOUR-USERNAME.github.io/`

## Notes about video size

GitHub repositories are not ideal for large video files. For short process videos, keep the files reasonably compressed. If your videos become large, the next version can use a video host and embed the videos while keeping the website itself completely free on GitHub Pages.

## Editing the gallery

Most future changes only require editing `config.js`. You do not need to change the HTML.

