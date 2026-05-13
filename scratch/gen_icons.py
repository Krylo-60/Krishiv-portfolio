"""
Generate all missing app SVG icons for Krishiv portfolio apps.
Run from: F:\Krishiv portfolio\scratch\
"""
import os

PORTFOLIO_DIR = r'F:\Krishiv portfolio'

# Icon definitions: (filename, emoji_char, gradient_start, gradient_end, bg)
ICONS = [
    # Bonus apps from app-catalog.js that only have logo.svg
    ("app-icon-streak-saver",       "🔥", "#ff6b35", "#ff4757", "#1a0805"),
    ("app-icon-focus-room-builder", "🏠", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-weekend-challenge",  "⚡", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-creator-brand-kit",  "🎨", "#b47dff", "#ff79e6", "#14051a"),
    ("app-icon-video-idea-vault",   "🎬", "#ff6b6b", "#ff4757", "#1a0505"),
    ("app-icon-stream-scene",       "📺", "#79d8ff", "#47b3ff", "#071223"),
    ("app-icon-study-buddy-board",  "👫", "#58d4a8", "#47d3a5", "#071223"),
    ("app-icon-homework-timer",     "⏰", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-daily-checkpoint",   "✅", "#56d5a6", "#47d3a5", "#071223"),
    ("app-icon-project-pitch-lab",  "💡", "#ffd166", "#79d8ff", "#071223"),
    ("app-icon-collab-tracker",     "🤝", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-badge-maker",        "🏅", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-quote-capsule",      "💬", "#b47dff", "#ff79e6", "#14051a"),
    ("app-icon-pack-list-planner",  "🎒", "#58d4a8", "#79d8ff", "#071223"),
    ("app-icon-keyboard-coach",     "⌨️", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-event-countdown",    "📅", "#ffd166", "#ff6b6b", "#1a0505"),
    ("app-icon-mini-habit-quest",   "🎮", "#b47dff", "#ff79e6", "#14051a"),
    ("app-icon-mood-color-diary",   "🌈", "#ff79e6", "#ffd166", "#14051a"),
    ("app-icon-victory-wall",       "🏆", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-ai-prompt-lab",      "🤖", "#79d8ff", "#b47dff", "#071223"),
    ("app-icon-daily-standup",      "📋", "#58d4a8", "#47d3a5", "#071223"),
    ("app-icon-syntax-library",     "💻", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-portfolio-analytics","📊", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-project-roadmap",    "🗺️", "#58d4a8", "#79d8ff", "#071223"),
    ("app-icon-creator-checklist",  "📝", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-thumbnail-builder",  "🖼️", "#ff79e6", "#b47dff", "#14051a"),
    ("app-icon-link-tree-pro",      "🔗", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-skill-tracker",      "📈", "#56d5a6", "#79d8ff", "#071223"),
    ("app-icon-pitch-deck-maker",   "🎯", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-devlog-journal",     "📔", "#ff79e6", "#b47dff", "#14051a"),
    ("app-icon-ui-component-gallery","🎨","#b47dff","#79d8ff","#14051a"),
    ("app-icon-social-planner",     "📱", "#58d4a8", "#79d8ff", "#071223"),
    ("app-icon-bug-tracker",        "🐛", "#ff6b6b", "#ff4757", "#1a0505"),
    ("app-icon-feedback-board",     "💬", "#79d8ff", "#58d4a8", "#071223"),
    ("app-icon-inspiration-vault",  "✨", "#ffd166", "#b47dff", "#14051a"),
    ("app-icon-coding-challenge",   "⚔️", "#79d8ff", "#56d5a6", "#071223"),
    ("app-icon-break-generator",    "☕", "#ffd166", "#f59e0b", "#1a1003"),
    ("app-icon-focus-stats",        "📊", "#56d5a6", "#79d8ff", "#071223"),
    ("app-icon-achievement-wall",   "🏆", "#ffd166", "#ff79e6", "#14051a"),
    ("app-icon-class-notes",        "📚", "#79d8ff", "#58d4a8", "#071223"),
]

SVG_TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c1}"/>
      <stop offset="100%" stop-color="{c2}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="{bg}"/>
  <rect x="6" y="6" width="52" height="52" rx="12" fill="none" stroke="url(#g)" stroke-width="1.5" opacity="0.4"/>
  <text x="32" y="42" text-anchor="middle" font-size="28" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">{emoji}</text>
</svg>
'''

created = 0
for name, emoji, c1, c2, bg in ICONS:
    path = os.path.join(PORTFOLIO_DIR, name + '.svg')
    if not os.path.exists(path):
        content = SVG_TEMPLATE.format(emoji=emoji, c1=c1, c2=c2, bg=bg)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        created += 1
        print(f"Created: {name}.svg")
    else:
        print(f"Exists:  {name}.svg")

print(f"\nDone. Created {created} new icons.")
