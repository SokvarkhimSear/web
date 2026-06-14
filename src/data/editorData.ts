import { EditorChallenge } from '../types';

export const editorChallenges: EditorChallenge[] = [
  {
    id: "chal-1",
    title: "Challenge 1: HTML Semantics",
    description: "Provide a semantic layout utilizing <header>, <nav>, <main>, <aside>, and <footer> tags. Replace the messy <div> wrappers below.",
    initialCode: `<div class="top-bar">\n  <h1>My Website</h1>\n</div>\n<div class="navigation">\n  <a href="#">Home</a>\n</div>\n<div class="content-area">\n  <p>Main content here.</p>\n</div>\n<div class="sidebar">\n  <p>Side info.</p>\n</div>\n<div class="bottom-bar">\n  <p>Copyright 2024</p>\n</div>`,
    validationMessage: "Ensure you use <header>, <nav>, <main>, <aside>, and <footer> tags, and that plain structural divs are replaced.",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      const hasTags = ['<header>', '<nav>', '<main>', '<aside>', '<footer>'].every(tag => lower.includes(tag));
      const hasDivs = lower.includes('<div');
      if (hasTags && !hasDivs) return true;
      if (hasDivs && hasTags) return "Good, you used semantic tags but left some plain <div> tags. Try to remove the wrapping divs.";
      return false;
    }
  },
  {
    id: "chal-2",
    title: "Challenge 2: HTML Multimedia Fallbacks",
    description: "Write a valid <video> tag that spans 320px width, displays user interface controls, links to 'movie.mp4', and provides explicit fallback text.",
    initialCode: `<div class="media-wrapper">\n\n</div>`,
    validationMessage: "Your <video> tag needs 'width=\"320\"', 'controls', a <source> pointing to 'movie.mp4', and fallback text before the closing tag.",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      if (!lower.includes('<video') || !lower.includes('</video>')) return false;
      if (!lower.includes('width="320"') && !lower.includes("width='320'") && !lower.includes('width=320')) return "Missing or incorrect width attribute (must be 320).";
      if (!lower.includes('controls')) return "Missing the 'controls' attribute in the video element.";
      if (!lower.includes('movie.mp4')) return "Missing a <source> pointing to 'movie.mp4'.";
      
      const insideVideo = lower.substring(lower.indexOf('>', lower.indexOf('<video')) + 1, lower.indexOf('</video>'));
      const textOnly = insideVideo.replace(/<[^>]+>/g, '').trim();
      if (textOnly.length < 5) return "Missing explicit fallback text for legacy browsers inside the video tag.";
      
      return true;
    }
  },
  {
    id: "chal-3",
    title: "Challenge 3: CSS External Links & Boilerplates",
    description: "Write a <link> connecting an external stylesheet named 'style.css' alongside a custom Favicon shortcut link pointing to './assets/favicon.ico'.",
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <!-- Write your links below -->

</head>
<body>
</body>
</html>`,
    validationMessage: "You must include two <link> elements: one for stylesheet ('style.css') and one for favicon ('./assets/favicon.ico').",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      if (!lower.includes('style.css')) return "Missing link to 'style.css'.";
      if (!lower.includes('stylesheet')) return "Missing 'rel=\"stylesheet\"' attribute.";
      if (!lower.includes('./assets/favicon.ico')) return "Missing link to './assets/favicon.ico'.";
      if (!lower.includes('icon')) return "Missing 'rel=\"icon\"' attribute for favicon.";
      return true;
    }
  },
  {
    id: "chal-4",
    title: "Challenge 4: CSS Selector Specificity & Colors",
    description: "Write an ID selector for 'main-title' that forces the text color to a translucent red using RGBA with a 0.5 alpha value. E.g. rgba(255, 0, 0, 0.5).",
    initialCode: `<style>
  div h1 { color: green; }
  .highlight { color: yellow; }
  
  /* Write your ID selector below */

</style>

<div>
  <h1 id="main-title" class="highlight">Specific Title</h1>
</div>`,
    validationMessage: "You must use the ID selector '#main-title' and set its color to a valid RGBA translucent red (e.g. rgba(255, 0, 0, 0.5)).",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      if (!lower.includes('#main-title')) return "You must use the exact ID selector '#main-title'.";
      const idBlockMatch = lower.match(/#main-title\s*{[^}]*}/);
      if (!idBlockMatch) return "You need a complete CSS rule block for '#main-title'.";
      const block = idBlockMatch[0].replace(/\s+/g, '');
      if (!block.includes('color:rgba(255,0,0,0.5)') && !block.includes('color:rgba(255,0,0,.5)')) {
          return "The color property inside the '#main-title' rule must be set to 'rgba(255, 0, 0, 0.5)'.";
      }
      return true;
    }
  },
  {
    id: "chal-5",
    title: "Challenge 5: CSS Box Model Mechanics",
    description: "Convert '.button' flow to 'display: block', set width to 200px, 12px padding on all sides, 10px external margin, and a 3px solid teal border.",
    initialCode: `<style>
  .button {
    /* Write your styles here */
    background-color: #1e1e24;
    color: white;
    text-align: center;
    text-decoration: none;
  }
</style>

<a href="#" class="button">Click Me</a>`,
    validationMessage: "Check your CSS properties: display, width, padding, margin, border. Be precise with the required values.",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      const styleMatch = lower.match(/\.button\s*{[^}]*}/);
      if (!styleMatch) return "Could not find '.button' style block.";
      const block = styleMatch[0].replace(/\s+|;/g, '');
      
      if (!block.includes('display:block')) return "Missing 'display: block'.";
      if (!block.includes('width:200px')) return "Missing 'width: 200px'.";
      if (!block.includes('padding:12px')) return "Missing 'padding: 12px'.";
      if (!block.includes('margin:10px')) return "Missing 'margin: 10px'.";
      if (!block.includes('border:3pxsolidteal')) return "Missing 'border: 3px solid teal'.";
      
      return true;
    }
  },
  {
    id: "chal-6",
    title: "Challenge 6: CSS Flexbox Layouts",
    description: "Activate Flexbox on '.nav-row', center elements along the horizontal main axis so items spread evenly using 'space-between', and set gap to 15px.",
    initialCode: `<style>
  .nav-row {
    /* Write your layout styles here */
    background: #3f3f3f;
    padding: 20px;
  }
  .nav-item {
    background: #00b4d8;
    padding: 10px;
    color: white;
  }
</style>

<div class="nav-row">
  <div class="nav-item">Link 1</div>
  <div class="nav-item">Link 2</div>
  <div class="nav-item">Link 3</div>
  <div class="nav-item">Link 4</div>
</div>`,
    validationMessage: "Use 'display: flex', 'justify-content: space-between', and 'gap: 15px' on the .nav-row.",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      const styleMatch = lower.match(/\.nav-row\s*{[^}]*}/);
      if (!styleMatch) return "Could not find '.nav-row' style block.";
      const block = styleMatch[0].replace(/\s+|;/g, '');
      
      if (!block.includes('display:flex')) return "Missing 'display: flex'.";
      if (!block.includes('justify-content:space-between')) return "Missing 'justify-content: space-between'.";
      if (!block.includes('gap:15px')) return "Missing 'gap: 15px'.";
      
      return true;
    }
  },
  {
    id: "chal-7",
    title: "Challenge 7: CSS Explicit Positioning",
    description: "Make '.sidebar-header' stick to the very top edge permanently as the user scrolls, using the modern hybrid coordinate positioning layout.",
    initialCode: `<style>
  body {
    height: 1500px; /* Force scrolling */
  }
  .sidebar-header {
    /* Write your positioning styles here */
    background-color: #272727;
    border-bottom: 1px solid #3f3f3f;
    padding: 16px;
    color: white;
  }
</style>

<div class="sidebar-header">
  <h2>Settings</h2>
</div>
<div class="content">Scroll down...</div>`,
    validationMessage: "You must use 'position: sticky;' and a threshold distance of 'top: 0;'.",
    validator: (code: string) => {
      const lower = code.toLowerCase();
      const styleMatch = lower.match(/\.sidebar-header\s*{[^}]*}/);
      if (!styleMatch) return "Could not find '.sidebar-header' style block.";
      const block = styleMatch[0].replace(/\s+|;/g, '');
      
      if (!block.includes('position:sticky')) return "Missing 'position: sticky'.";
      if (!block.includes('top:0')) return "Missing 'top: 0'.";
      
      return true;
    }
  }
];
