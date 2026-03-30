import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "../public/lifer-body.html");

let s = fs.readFileSync(htmlPath, "utf8");

const aboutNew = `<h2 class="heading-h2-64px reveal-type">Education needs <span class="about_text-gradient">intelligent support</span>. Without help after class, exam prep stays generic and overwhelming.<br/><br/>EDDGE brings <span class="about_text-gradient">doubt solving</span>, mock tests, and answer evaluation into one AI workspace aligned with CBSE, ICSE, and state boards.<br/><br/>Traditional tools cannot scale <span class="about_text-gradient">personal tutoring</span>. We built EDDGE to bridge that gap — student-first, privacy-aware, and teacher-friendly.</h2>`;

const aboutRe = /<h2 class="heading-h2-64px reveal-type">[\s\S]*?<\/h2>(?=\s*<\/div>\s*<\/div>\s*<div class="about_gradient-root">)/;
if (!aboutRe.test(s)) {
  console.error("About section pattern not found");
  process.exit(1);
}
s = s.replace(aboutRe, aboutNew);

const pairs = [
  ['<div class="nav_brand-text">Lifer</div>', '<div class="nav_brand-text">EDDGE</div>'],
  [
    '<a href="#" class="nav_menu_link">Benefits</a><a href="#" class="nav_menu_link">Blog</a><a href="#" class="nav_menu_link">Prices</a><a href="#" class="nav_menu_link">Contacts</a><a href="#" class="nav_menu_link">Why Lifer</a><a href="#" class="nav_menu_link">Partnership</a>',
    '<a href="/#Product-section" class="nav_menu_link">Product</a><a href="/#How-it-works-section" class="nav_menu_link">How It Works</a><a href="/#Pricing-section" class="nav_menu_link">Pricing</a><a href="/#Contact-section" class="nav_menu_link">Contact</a><a href="/#Students-section" class="nav_menu_link">For Students</a><a href="/#Pricing-section" class="nav_menu_link">For Schools</a>',
  ],
  [
    '<a data-lenis-start="" href="#" class="nav_menu_link">Benefits</a><a data-lenis-start="" href="#" class="nav_menu_link">Blog</a><a data-lenis-start="" href="#" class="nav_menu_link">Prices</a><a data-lenis-start="" href="#" class="nav_menu_link">Contacts</a><a data-lenis-start="" href="#" class="nav_menu_link">Why Lifer</a><a data-lenis-start="" href="#" class="nav_menu_link">Partnership</a>',
    '<a data-lenis-start="" href="/#Product-section" class="nav_menu_link">Product</a><a data-lenis-start="" href="/#How-it-works-section" class="nav_menu_link">How It Works</a><a data-lenis-start="" href="/#Pricing-section" class="nav_menu_link">Pricing</a><a data-lenis-start="" href="/#Contact-section" class="nav_menu_link">Contact</a><a data-lenis-start="" href="/#Students-section" class="nav_menu_link">For Students</a><a data-lenis-start="" href="/#Pricing-section" class="nav_menu_link">For Schools</a>',
  ],
  [
    '<a href="#" class="text-size-14px">Instagram</a><a href="#" class="text-size-14px">Facebook</a><a href="#" class="text-size-14px">Linkedin</a>',
    '<a href="https://www.linkedin.com/" class="text-size-14px">LinkedIn</a><a href="https://x.com/" class="text-size-14px">X</a><a href="https://www.youtube.com/" class="text-size-14px">YouTube</a>',
  ],
  ['<div js-char-button="" class="button-label">Share Your Story</div>', '<div js-char-button="" class="button-label">Start Learning Free</div>'],
  ['<div js-char-button="" class="button-label">Book a Free Call</div>', '<div js-char-button="" class="button-label">Request School Demo</div>'],
  ['<div data-text-gradient="" class="hero_tag-text">Release new device in this May</div>', '<div data-text-gradient="" class="hero_tag-text">CBSE · ICSE · State boards</div>'],
  ['<h1 js-line-headings="" class="heading-h1 padding-bottom-16px">Life-changing diabetes support</h1>', '<h1 js-line-headings="" class="heading-h1 padding-bottom-16px">The AI Operating System for Students</h1>'],
  [
    '<p class="text-size-16px">Self-managing your diabetes can be tough… let us make it easy. Start using a CGM and get live insights from the medical team in your pocket.</p>',
    '<p class="text-size-16px">EDDGE is an intelligent learning platform for Indian students—clear doubts instantly, practice smarter, and prepare for board exams with advanced AI.</p>',
  ],
  ['<div class="button-label">Start The 4-Week Program</div>', '<div class="button-label">Start Learning Free</div>'],
  [
    '<p class="text-size-16px text-weight-medium text-size-18px">“Within just one week, we had identified the problem, tested a solution and validated the results. And I did it all by simply messaging with my care team within the Steady app.”</p><p class="text-size-12px text-size-14px">Parteek, November 2019</p>',
    '<p class="text-size-16px text-weight-medium text-size-18px">“EDDGE helped me understand organic chemistry in a way my textbook never could.”</p><p class="text-size-12px text-size-14px">Ananya, Grade 12</p>',
  ],
  [
    '<p class="trusted-heading">Trusted by <strong class="text-weight-medium text-color-primary">3,450+</strong> happy customers from the whole world</p>',
    '<p class="trusted-heading">Used by <strong class="text-weight-medium text-color-primary">students</strong> across schools in India</p>',
  ],
  [
    '<h2 js-line-headings-section="" class="heading-h2-48px">The new gold standard in diabetes care</h2>',
    '<h2 js-line-headings-section="" class="heading-h2-48px">One AI platform for all academic needs</h2>',
  ],
  ['<div js-char-button="" class="button-label hide-mobile-portrait">Learn More</div>', '<div js-char-button="" class="button-label hide-mobile-portrait">Explore features</div>'],
  ['<p class="text-size-16px">CGM at your door in 3-5 days</p>', '<p class="text-size-16px">Sign up in minutes</p>'],
  ['<p class="text-size-16px">LIVE coaching via chat</p>', '<p class="text-size-16px">24/7 AI doubt solving</p>'],
  ['<p class="text-size-16px">Monthly 20-min virtual visits</p>', '<p class="text-size-16px">Practice, mocks &amp; PYQs</p>'],
  ['<p class="text-size-16px">Easy-to-understand reports</p>', '<p class="text-size-16px">Analytics &amp; study plans</p>'],
  ['<span>Managing your diabetes has never been </span>', '<span>Learning with clarity has never been </span>'],
  ['<div js-char-button="" class="button-label">Start with a FREE assessment</div>', '<div js-char-button="" class="button-label">Get started free</div>'],
  ['<div class="text-size-14px text-weight-medium">Low Blood Sugar In The Mornings</div>', '<div class="text-size-14px text-weight-medium">Weak topics flagged early</div>'],
  ['<h2 js-line-headings-section="" class="heading-h2-48px">Real results<br/>and situations</h2>', '<h2 js-line-headings-section="" class="heading-h2-48px">Built for real<br/>learning outcomes</h2>'],
  ['<h4 class="heading-h4">CGMs vs Fingersticks</h4>', '<h4 class="heading-h4">AI help vs waiting hours</h4>'],
  ['<div class="text-size-12px text-weight-medium margin-bottom-1px">Undetected highs</div>', '<div class="text-size-12px text-weight-medium margin-bottom-1px">Unsolved doubts</div>'],
  ['<p class="text-size-12px max-width-xxsmall">CGMs never let variations in glucose levels go undetected</p>', '<p class="text-size-12px max-width-xxsmall">EDDGE surfaces gaps before they show up on exam day</p>'],
  ['<h4 class="heading-h4">Understand the dawn phenomenon</h4>', '<h4 class="heading-h4">See mastery trends over time</h4>'],
  ['<p class="text-size-12px max-width-xxsmall">Better understand the dawn phenomenon and how to tackle it</p>', '<p class="text-size-12px max-width-xxsmall">Spot weak chapters early and focus revision where it counts</p>'],
  ['<h4 class="heading-h4">Data is the core</h4>', '<h4 class="heading-h4">Insights that drive progress</h4>'],
  ['<div class="text-size-18px text-weight-medium">Low blood glucose</div>', '<div class="text-size-18px text-weight-medium">Stuck on hard questions</div>'],
  [
    '<h2 js-line-headings-section="" class="heading-h2-48px heading-h2-20px-mob">It’s time to rally against the\xa0diabetes epidemic</h2>',
    '<h2 js-line-headings-section="" class="heading-h2-48px heading-h2-20px-mob">Every student deserves a tutor that never clocks out</h2>',
  ],
  ['<p class="text-size-12px text-weight-medium text-size-14px-mob">Blood Glucose</p>', '<p class="text-size-12px text-weight-medium text-size-14px-mob">Quiz score</p>'],
  ['<p class="text-size-12px text-size-10px-mob">1 min ago</p>', '<p class="text-size-12px text-size-10px-mob">Just now</p>'],
  ['<div class="text-size-12px margin-bottom-20px">mmol/L</div>', '<div class="text-size-12px margin-bottom-20px">% correct</div>'],
  ['<p class="text-size-12px text-weight-medium text-size-14px-mob">6 Hours Forecase</p>', '<p class="text-size-12px text-weight-medium text-size-14px-mob">Weekly goal</p>'],
  ['<p class="text-size-12px text-size-10px-mob">Predicted Range</p>', '<p class="text-size-12px text-size-10px-mob">On track</p>'],
  ['<div class="text-size-12px margin-bottom-20px">% falling</div>', '<div class="text-size-12px margin-bottom-20px">% improving</div>'],
  [
    '<h2 class="heading-h2-56px h2-slide">&quot;Lifer helps me keep my blood sugars in check without the dreaded 3 hour trips to the hospital. I love that I can just send them a quick message in the app and get answers the same day.&quot;</h2>',
    '<h2 class="heading-h2-56px h2-slide">&quot;The AI mock tests and PYQ practice on EDDGE improved my board prep—I finally know what to revise first.&quot;</h2>',
  ],
  [
    '<h2 class="heading-h2-56px h2-slide">“Without the dreaded three-hour hospital trips, Steady helps me keep my blood sugars in check. I also love that I can send a quick message in the app and receive answers the same day.”</h2>',
    '<h2 class="heading-h2-56px h2-slide">“EDDGE helped me understand organic chemistry in a way my textbook never could.”</h2>',
  ],
  [
    '<h2 class="heading-h2-56px h2-slide">“Thanks to Lifer, I can keep my blood sugars in check without those dreaded three-hour hospital trips. I also appreciate that I can send a quick message in the app and get same-day answers.”</h2>',
    '<h2 class="heading-h2-56px h2-slide">“As a teacher, automated evaluation on EDDGE saves me hours every week—without sacrificing feedback quality.”</h2>',
  ],
  [
    '<h2 class="heading-h2-56px h2-slide">“By using Lifer, I can maintain my blood sugar levels without the dreaded three-hour trips to the hospital. I love that I can send a quick message through the app and receive same-day answers.</h2>',
    '<h2 class="heading-h2-56px h2-slide">“Our school pilot showed students asking more doubts after class because EDDGE is always there—simple, fast, and aligned to our syllabus.”</h2>',
  ],
  ['<h2 js-line-headings-section="" class="heading-h2-48px">Get an answer on<br/>any diabet question</h2>', '<h2 js-line-headings-section="" class="heading-h2-48px">Get answers to any<br/>academic question</h2>'],
  [
    '<h2 js-line-headings-section="" class="heading-h2-48px heading-h2-36px-mob">Putting Your Health First, Always</h2>',
    '<h2 js-line-headings-section="" class="heading-h2-48px heading-h2-36px-mob">Start your AI learning journey today</h2>',
  ],
  [
    '<span class="span-hidden">Putting Your Health First, </span><span class="z-index-1"><span class="span-hidden">Always</span>',
    '<span class="span-hidden">Start your AI learning journey </span><span class="z-index-1"><span class="span-hidden">today</span>',
  ],
  ['<div class="text-size-12px">© 2024 Lifer. All rights reserved</div>', '<div class="text-size-12px">© 2026 EDDGE. All rights reserved</div>'],
  [
    '<a href="#" class="footer_link text-weight-light">Terms of Use</a><a href="#" class="footer_link text-weight-light">Terms of Use</a>',
    '<a href="/terms-of-service" class="footer_link text-weight-light">Terms of Service</a><a href="/cookie-policy" class="footer_link text-weight-light">Cookie Policy</a>',
  ],
  [
    '<span>Built by the sea in </span><span class="footer-image-span"><img loading="lazy" src="https://cdn.prod.website-files.com/66a3e3bd14091f433acdfb36/66a3e5321947f7c29785aadb_ua.png" alt="" class="image"/></span><span>\xa0Ukraine by Glow Design Agency</span>',
    "<span>Built for students and schools in India.</span>",
  ],
];

for (const [a, b] of pairs) {
  if (!s.includes(a)) {
    console.warn("Pattern not found (skipped):", a.slice(0, 72).replace(/\s+/g, " "));
  } else {
    s = s.split(a).join(b);
  }
}

// Results section closing blurb (was CGM + coaching copy)
s = s.replace(
  /<p class="text-size-16px">Use powerful insights of a CGM combined with real-time coaching to achieve meaningful goals\.<\/p>/,
  "<p class=\"text-size-16px\">EDDGE combines AI tutoring, practice, and analytics so every study session moves the needle.</p>"
);

// Keep key nav/footer links functional after re-applying content transforms.
s = s
  .replace(/href="#" class="button is-navbar-small w-inline-block"/g, 'href="/#Students-section" class="button is-navbar-small w-inline-block"')
  .replace(/href="#" class="button is-navbar-animation w-inline-block"/g, 'href="/#Contact-section" class="button is-navbar-animation w-inline-block"')
  .replace(/href="#" class="button is-mob w-inline-block"/g, 'href="/#Hero-section" class="button is-mob w-inline-block"')
  .replace(/data-gsap-button-hero="" data-btn-hero-gradient="" href="#" class="button is-hero-section w-inline-block"/g, 'data-gsap-button-hero="" data-btn-hero-gradient="" href="/#Students-section" class="button is-hero-section w-inline-block"')
  .replace(/href="#" class="footer_link">Overview/g, 'href="/#Product-section" class="footer_link">Overview')
  .replace(/href="#" class="footer_link">Features/g, 'href="/#Features-section" class="footer_link">Features')
  .replace(/href="#" class="footer_link">Pricing/g, 'href="/#Pricing-section" class="footer_link">Pricing')
  .replace(/href="#" class="footer_link">Careers/g, 'href="/#Contact-section" class="footer_link">Careers')
  .replace(/href="#" class="footer_link">Help/g, 'href="/#Help-section" class="footer_link">Help')
  .replace(/href="#" class="footer_link">Privacy/g, 'href="/privacy-policy" class="footer_link">Privacy')
  .replace(/href="#" class="footer_link text-weight-light">Privacy Policy/g, 'href="/privacy-policy" class="footer_link text-weight-light">Privacy Policy')
  .replace(/data-gsap-answer-button="" class="answer_button"><a data-gsap-button="" href="#" class="button is-secondary w-inline-block"/g, 'data-gsap-answer-button="" class="answer_button"><a data-gsap-button="" href="/#Contact-section" class="button is-secondary w-inline-block"');

fs.writeFileSync(htmlPath, s);
console.log("Updated", htmlPath);
