import json
import os

filepath = 'public/lifer-runtime.json'
if not os.path.exists(filepath):
    print("File not found")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

animation_code = """
(function() {
  const section = document.querySelector('[data-gsap-student]');
  if (!section) return;

  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded');
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    }
  });

  tl.from(section.querySelector('.student-dashboard-badge'), {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  })
  .from(section.querySelector('.student-dashboard-heading'), {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')
  .from(section.querySelector('.student-dashboard-desc'), {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  .from(section.querySelectorAll('.student-dashboard-item'), {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.2')
  .from(section.querySelector('.student-dashboard-image-container'), {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=1')
  .from(section.querySelector('.image-decoration-blob'), {
    opacity: 0,
    scale: 0,
    duration: 1.2,
    ease: 'power2.out'
  }, '-=0.8');
})();
"""

data.append({"type": "inline", "code": animation_code})

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f)
