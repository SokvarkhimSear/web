import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: "m1-1",
    module: 1,
    question: "What is the primary function of a Web Client (Web Browser)?",
    options: [
      "To store website files and serve them to users.",
      "To make HTTP requests to servers and render the resulting code.",
      "To interpret server-side databases.",
      "To secure the network protocol directly."
    ],
    correctAnswerIndex: 1,
    explanation: "A client's main function is to request content from a web server and render it (HTML, CSS, JS) into a user-friendly interface."
  },
  {
    id: "m1-2",
    module: 1,
    question: "What organization develops open, foundational standards for the Web?",
    options: [
      "ICANN",
      "IETF",
      "W3C (World Wide Web Consortium)",
      "Web Standards Group"
    ],
    correctAnswerIndex: 2,
    explanation: "W3C develops foundational standards to ensure uniform growth of the Web."
  },
  {
    id: "m1-3",
    module: 1,
    question: "Which of the following describes the correct anatomy of a URL path?",
    options: [
      "Subdomain -> Protocol -> Domain -> Folder",
      "Protocol -> Subdomain -> Domain -> Folder/Path -> Resource",
      "Domain -> Protocol -> Subdomain -> Path",
      "Resource -> Protocol -> Domain -> Path"
    ],
    correctAnswerIndex: 1,
    explanation: "The correct sequence is Protocol (http://), Subdomain (www), Domain Name (company.com), Folder/Path (/info/), and Filename/Resource (about.html)."
  },
  {
    id: "m1-4",
    module: 1,
    question: "Is it ethically permissible to duplicate another developer's precise website structural code and design layout for commercial, client-facing sites?",
    options: [
      "Yes, if you change the colors.",
      "Yes, there is no copyright on HTML layouts.",
      "No, this violates digital integrity and copyright boundaries.",
      "Yes, if the source code is public."
    ],
    correctAnswerIndex: 2,
    explanation: "Duplicating exact layouts and structures for commercial use violates ethical and sometimes legal bounds of plagiarism and copyright."
  },
  {
    id: "m2-1",
    module: 2,
    question: "Which sequence correctly represents the modern HTML5 boilerplate?",
    options: [
      "<html>, <head>, <body>, <title>",
      "<!DOCTYPE html>, <html lang='en'>, <head>, <meta charset='UTF-8'>, <title>, <body>",
      "<!DOCTYPE>, <head>, <title>, <body lang='en'>",
      "<html>, <!DOCTYPE html>, <header>, <main>"
    ],
    correctAnswerIndex: 1,
    explanation: "The boilerplate starts with the DOCTYPE declaration followed by the html root, head (with metadata), and then the body."
  },
  {
    id: "m2-2",
    module: 2,
    question: "What is the HTML structural element nesting rule?",
    options: [
      "First-In, First-Out (FIFO)",
      "Elements can be closed in any order.",
      "Last-In, First-Out (LIFO)",
      "Outer elements must be closed before inner elements."
    ],
    correctAnswerIndex: 2,
    explanation: "Nesting follows a strict Last-In, First-Out (LIFO) hierarchy. Overlapping tags breaks the HTML parser."
  },
  {
    id: "m2-3",
    module: 2,
    question: "Which HTML attributes are essential for the 'img' element format regarding accessibility?",
    options: [
      "src, height",
      "src, width",
      "src, alt",
      "href, alt"
    ],
    correctAnswerIndex: 2,
    explanation: "The 'alt' (alternative text) attribute is critical for screen readers (accessibility) and SEO indexing."
  },
  {
    id: "m2-4",
    module: 2,
    question: "When should you use the PNG image format over JPG?",
    options: [
      "For deep tonal photographic content without transparency.",
      "For small animation loops.",
      "When lossless compression and alpha channel transparency are required.",
      "For optimal loading speed on large background photos."
    ],
    correctAnswerIndex: 2,
    explanation: "PNG is purely lossless and supports full variable transparency (alpha channels), ideal for logos and complex icons."
  },
  {
    id: "m2-5",
    module: 2,
    question: "Which list correctly identifies Advanced Semantic HTML5 structure tags?",
    options: [
      "<header>, <font>, <bold>, <italic>",
      "<div>, <span>, <br>, <hr>",
      "<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>",
      "<top>, <middle>, <bottom>, <left>, <right>"
    ],
    correctAnswerIndex: 2,
    explanation: "Semantic HTML5 layout tags tell the browser exactly what role the content plays."
  },
  {
    id: "m3-1",
    module: 3,
    question: "Which CSS Specificity priority calculation is correct (from lowest to highest)?",
    options: [
      "ID < Class < Element < Inline",
      "Inline < ID < Class < Element",
      "Element < Class < ID < Inline",
      "Class < Element < Inline < ID"
    ],
    correctAnswerIndex: 2,
    explanation: "Element selectors have the lowest weight, followed by Class selectors, ID selectors, and finally Inline styles overriding everything."
  },
  {
    id: "m3-2",
    module: 3,
    question: "What is the chronological configuration for CSS pseudo-class link interaction states?",
    options: [
      ":visited -> :hover -> :active -> :link",
      ":link -> :visited -> :hover -> :active",
      ":hover -> :active -> :link -> :visited",
      ":link -> :hover -> :visited -> :active"
    ],
    correctAnswerIndex: 1,
    explanation: "The sequence forms 'LoVe HAte': :link, :visited, :hover, :active."
  },
  {
    id: "m3-3",
    module: 3,
    question: "What do the components of the CSS Box Model consist of (from inside to outside)?",
    options: [
      "Margin -> Border -> Padding -> Content area",
      "Content area -> Border -> Padding -> Margin",
      "Content area -> Padding -> Border -> Margin",
      "Padding -> Content area -> Margin -> Border"
    ],
    correctAnswerIndex: 2,
    explanation: "The CSS box model layers are Content area, then Padding (clear space), then Border (outline), and Margin (outer clear space)."
  },
  {
    id: "m3-4",
    module: 3,
    question: "Which 'justify-content' property value distributes Flexbox items evenly so the first item touches the start and the last item touches the end?",
    options: [
      "space-around",
      "space-evenly",
      "center",
      "space-between"
    ],
    correctAnswerIndex: 3,
    explanation: "'space-between' places the first item at the very start and the last at the very end, distributing internal items evenly."
  },
  {
    id: "m3-5",
    module: 3,
    question: "Which 'position' coordinate property behaves like 'relative' until the user scrolls past a specified threshold, locking it into the viewport window?",
    options: [
      "fixed",
      "absolute",
      "sticky",
      "static"
    ],
    correctAnswerIndex: 2,
    explanation: "Position: sticky is a hybrid model that locks elements into place only after they cross a defined scroll threshold."
  }
];
