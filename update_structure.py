import os
import re

# Directory containing the HTML files
BASE_DIR = r"c:\Users\wwwbh\.gemini\antigravity\scratch\baps-chattralay-frontend"

def update_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove Top Bar
    # Regex to match the top-bar div and its content (non-greedy)
    # Handling potential multiline content
    content = re.sub(r'<div class="top-bar">.*?</div>\s*', '', content, flags=re.DOTALL)

    # 2. Add Contact Link
    # target: <a href="/apply.html" class="nav-cta">
    # insert before it: <a href="/contact.html">Contact</a>
    if 'href="/contact.html"' not in content:
         content = content.replace(
            '<a href="/apply.html" class="nav-cta">',
            '<a href="/contact.html">Contact</a>\n            <a href="/apply.html" class="nav-cta">'
        )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

def main():
    files = [f for f in os.listdir(BASE_DIR) if f.endswith('.html')]
    for file_name in files:
        update_html_file(os.path.join(BASE_DIR, file_name))

if __name__ == "__main__":
    main()
