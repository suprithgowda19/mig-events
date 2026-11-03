import re

with open('content/all_site_text.md', 'r', encoding='utf-8') as f:
    text = f.read()

print('Instagram:', set(re.findall(r'https?://(?:www\.)?instagram\.com/[^\s"\'<>)]+', text)))
print('LinkedIn:', set(re.findall(r'https?://(?:www\.)?linkedin\.com/[^\s"\'<>)]+', text)))
print('WhatsApp:', set(re.findall(r'https?://(?:wa\.me|api\.whatsapp\.com)/[^\s"\'<>)]+', text)))
print('Emails:', set(re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)))
