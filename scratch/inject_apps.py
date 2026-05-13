import json

with open("app-catalog.js", "r", encoding="utf-8") as f:
    content = f.read()
    # Extract the JSON array
    json_str = content.split("window.KRISHIV_BONUS_APPS = ")[1].split(";")[0]
    bonus_apps = json.loads(json_str)

card_template = """          <a class="app-verse-card" href="{href}" data-launch-name="{name}" data-launch-tags="{tags}" {tier_attr}>
            <div class="app-verse-head">
              <img class="app-mini-logo-img" src="{icon}" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span class="card-kicker">{tag}</span>
            </div>
            <h3>{name}</h3>
            <span class="app-status-chip">Working App</span>
            <p>{description}</p>
          </a>"""

all_cards = []
for app in bonus_apps:
    tier_attr = 'data-tier="featured"' if app.get("tier") == "featured" else ""
    card = card_template.format(
        href=app["href"],
        name=app["name"],
        tags=app.get("searchTags", app["tag"].lower()),
        icon=app.get("icon", "logo.svg"),
        tag=app["tag"],
        description=app["description"],
        tier_attr=tier_attr
    )
    all_cards.append(card)

# Inject into index.html
with open("index.html", "r", encoding="utf-8") as f:
    index_content = f.read()

# Find the end of the app-verse-grid
marker = '<a class="app-verse-card" href="screenshot-annotator.html"'
end_of_annotator = index_content.find('</a>', index_content.find(marker)) + 4

new_index_content = index_content[:end_of_annotator] + "\n" + "\n".join(all_cards) + index_content[end_of_annotator:]

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_index_content)

print(f"Injected {len(all_cards)} bonus apps into index.html")
