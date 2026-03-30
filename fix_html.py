# -*- coding: utf-8 -*-
with open('public/lifer-body.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Character fixes
content = content.replace('Ã‚Â·', '·')
content = content.replace('Ã¢â‚¬â€', '—')
content = content.replace('Ã¢â‚¬Å“', '“')
content = content.replace('Ã¢â‚¬Â', '”')
content = content.replace('Ã¢â‚¬Â¢', '·')
content = content.replace('Ã¢â‚¬Å½', '')
content = content.replace('Ã¢â‚¬â', '—')

# Image updates
content = content.replace('edu-img-1.jpg', 'study_plan_modern.png')
content = content.replace('premium_how_it_works_bg.png', 'how_it_works_premium.png')
content = content.replace('edu-img-3.jpg', 'premium_results_bg.png')
content = content.replace('edu-img-4.jpg', 'premium_tutor_bg.png')

with open('public/lifer-body.html', 'w', encoding='utf-8') as f:
    f.write(content)
