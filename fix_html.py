# -*- coding: utf-8 -*-
with open('public/lifer-body.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Character fixes
replacements = {
    'Ã‚Â·': '·',
    'Ã¢â‚¬â€': '—',
    'Ã¢â‚¬Å“': '“',
    'Ã¢â‚¬Â': '”',
    'Ã¢â‚¬Â¢': '·',
    'Ã¢â‚¬Å½': '',
    'Ã¢â‚¬â': '—',
    'Ã‚Â©': '©',
    'Ã¢â‚¬„¢': "’",
    'Ã¢â‚¬': '—'
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Image updates
image_updates = {
    'edu-img-1.jpg': 'premium_study.jpg',
    'premium_how_it_works_bg.png': 'premium_tablet.jpg',
    'edu-img-3.jpg': 'premium_student.jpg',
    'edu-img-4.jpg': 'premium_library.jpg',
    'study_plan_modern.png': 'premium_study.jpg',
    'how_it_works_premium.png': 'premium_tablet.jpg',
    'premium_results_bg.png': 'premium_student.jpg',
    'premium_tutor_bg.png': 'premium_library.jpg'
}

for old, new in image_updates.items():
    content = content.replace(old, new)

with open('public/lifer-body.html', 'w', encoding='utf-8') as f:
    f.write(content)
