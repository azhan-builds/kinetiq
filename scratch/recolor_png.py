"""
Replace the cream background of kinetiq-machine-final.png with #e6d3a8.
Preserves the robot by only replacing pixels close to the original background color.
Uses a smooth blending approach at edges to avoid harsh cutouts.
"""
from PIL import Image
import numpy as np

# Config
INPUT  = "public/hero/kinetiq-machine-final.png"
OUTPUT = "public/hero/kinetiq-machine-final.png"  # overwrite in place
TARGET = np.array([230, 211, 168], dtype=np.float64)  # #e6d3a8

img = Image.open(INPUT).convert("RGB")
pixels = np.array(img, dtype=np.float64)  # (H, W, 3)

# Sample the original background from corner pixels
# The background is ~(253, 248, 230)
bg_ref = np.array([253, 248, 230], dtype=np.float64)

# Compute per-pixel Euclidean distance to the background reference
diff = np.sqrt(np.sum((pixels - bg_ref) ** 2, axis=2))

# Threshold: pixels within this distance are "background"
HARD_THRESH = 30   # definitely background
SOFT_THRESH = 50   # blend zone (edge anti-aliasing)

# Create alpha mask: 1.0 = fully replace, 0.0 = keep original
alpha = np.zeros(diff.shape, dtype=np.float64)
alpha[diff <= HARD_THRESH] = 1.0
# Smooth blend between HARD and SOFT
blend_mask = (diff > HARD_THRESH) & (diff <= SOFT_THRESH)
alpha[blend_mask] = 1.0 - (diff[blend_mask] - HARD_THRESH) / (SOFT_THRESH - HARD_THRESH)

# Apply: for each pixel, blend between original and recolored
# Recolored = original + (target_bg - ref_bg) offset, clamped
offset = TARGET - bg_ref  # the color shift to apply
recolored = pixels + offset[np.newaxis, np.newaxis, :]
recolored = np.clip(recolored, 0, 255)

# Blend
alpha3 = alpha[:, :, np.newaxis]  # broadcast to 3 channels
result = pixels * (1.0 - alpha3) + recolored * alpha3
result = np.clip(result, 0, 255).astype(np.uint8)

out_img = Image.fromarray(result, "RGB")
out_img.save(OUTPUT, "PNG")
print(f"Saved recolored PNG to {OUTPUT}")
print(f"Verification corners:")
out_check = Image.open(OUTPUT).convert("RGB")
w, h = out_check.size
for label, pos in [("TL", (0,0)), ("TR", (w-1,0)), ("BL", (0,h-1)), ("BR", (w-1,h-1))]:
    print(f"  {label}: {out_check.getpixel(pos)}")
