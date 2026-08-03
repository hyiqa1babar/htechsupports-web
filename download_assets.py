import os
import re
import urllib.request
from urllib.parse import urlparse

# Create directories
base_dir = r"C:\Users\HP\.gemini\antigravity-ide\scratch\htechsupports-app"
client_assets_dir = os.path.join(base_dir, "client", "public", "assets")
logos_dir = os.path.join(client_assets_dir, "logos")
images_dir = os.path.join(client_assets_dir, "images")
clients_dir = os.path.join(client_assets_dir, "clients")
partners_dir = os.path.join(client_assets_dir, "partners")

os.makedirs(logos_dir, exist_ok=True)
os.makedirs(images_dir, exist_ok=True)
os.makedirs(clients_dir, exist_ok=True)
os.makedirs(partners_dir, exist_ok=True)

# List of known image URLs from the site inspection
assets = [
    ("logo-dark.png", "https://htechsupports.com/wp-content/uploads/2024/04/PNG.png"),
    ("logo-light.png", "https://htechsupports.com/wp-content/uploads/2024/04/white.png"),
    ("hero-startup-1.png", "https://htechsupports.com/wp-content/uploads/2024/04/startup33.png"),
    ("hero-startup-2.png", "https://htechsupports.com/wp-content/uploads/2024/04/startup3a.png"),
    ("coverage-map.jpg", "https://htechsupports.com/wp-content/uploads/2024/07/map.jpg"),
]

# Client logos list from the HTML
client_logo_urls = [
    "https://htechsupports.com/wp-content/uploads/2024/04/351.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/36.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/34.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/33.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/32.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/31.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/30.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/29.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/28.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/27.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/26.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/25.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/24.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/23.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/22.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/21.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/008.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/07.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/01.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/06.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/005.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/04/03.png",
    "https://htechsupports.com/wp-content/uploads/2024/04/02.png"
]

# Real "OUR PARTNERS" logos from the Company page — NOT the same as the client logos above
partner_logo_urls = [
    "https://htechsupports.com/wp-content/uploads/2024/07/service_industry_association_logo-150x150.jpeg",
    "https://htechsupports.com/wp-content/uploads/2024/07/ascdi_logo-150x150.jpeg",
    "https://htechsupports.com/wp-content/uploads/2024/07/file-300x200.jpg",
    "https://htechsupports.com/wp-content/uploads/2024/07/2017_Ekahau_logo_black-640x360-1-300x169.png",
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("Downloading core site assets...")
for name, url in assets:
    target = os.path.join(logos_dir if "logo" in name else images_dir, name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(target, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")

print("\nDownloading client logo assets...")
for url in client_logo_urls:
    filename = os.path.basename(urlparse(url).path)
    target = os.path.join(clients_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(target, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded client logo: {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("\nDownloading OUR PARTNERS logo assets...")
for url in partner_logo_urls:
    filename = os.path.basename(urlparse(url).path)
    target = os.path.join(partners_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(target, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded partner logo: {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("\nAsset download complete.")
