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
    'edu-img-1.jpg': 'study_plan_modern.png',
    'premium_how_it_works_bg.png': 'how_it_works_premium.png',
    'edu-img-3.jpg': 'premium_results_bg.png',
    'edu-img-4.jpg': 'premium_tutor_bg.png'
}

for old, new in image_updates.items():
    content = content.replace(old, new)

with open('public/lifer-body.html', 'w', encoding='utf-8') as f:
    f.write(content)
