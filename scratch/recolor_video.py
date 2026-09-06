"""
Recolor the video background from its original cream (~242,236,217) to #e6d3a8 (230,211,168).
Uses frame-by-frame processing with the same distance-based blending as the PNG script.
Outputs frames, then reassembles with ffmpeg to preserve quality.
"""
import os
import subprocess
import numpy as np
from PIL import Image
import glob

WORKDIR = "scratch/video_recolor"
INPUT_VIDEO = "public/hero/kinetiq-formation.mp4"
OUTPUT_VIDEO = "public/hero/kinetiq-formation-recolored.mp4"
FRAMES_DIR = os.path.join(WORKDIR, "frames")
OUT_FRAMES_DIR = os.path.join(WORKDIR, "out_frames")

os.makedirs(FRAMES_DIR, exist_ok=True)
os.makedirs(OUT_FRAMES_DIR, exist_ok=True)

# Step 1: Extract all frames
print("Extracting frames...")
subprocess.run([
    "ffmpeg", "-y", "-i", INPUT_VIDEO,
    "-q:v", "1",
    os.path.join(FRAMES_DIR, "frame_%05d.png")
], capture_output=True, check=True)

frames = sorted(glob.glob(os.path.join(FRAMES_DIR, "frame_*.png")))
print(f"Extracted {len(frames)} frames")

# Step 2: Recolor each frame
# Video background reference color (sampled from corners of frame 1)
bg_ref = np.array([242, 236, 217], dtype=np.float64)
target = np.array([230, 211, 168], dtype=np.float64)  # #e6d3a8
offset = target - bg_ref

HARD_THRESH = 28
SOFT_THRESH = 48

for i, fpath in enumerate(frames):
    img = Image.open(fpath).convert("RGB")
    pixels = np.array(img, dtype=np.float64)

    diff = np.sqrt(np.sum((pixels - bg_ref) ** 2, axis=2))

    alpha = np.zeros(diff.shape, dtype=np.float64)
    alpha[diff <= HARD_THRESH] = 1.0
    blend_mask = (diff > HARD_THRESH) & (diff <= SOFT_THRESH)
    alpha[blend_mask] = 1.0 - (diff[blend_mask] - HARD_THRESH) / (SOFT_THRESH - HARD_THRESH)

    recolored = pixels + offset[np.newaxis, np.newaxis, :]
    recolored = np.clip(recolored, 0, 255)

    alpha3 = alpha[:, :, np.newaxis]
    result = pixels * (1.0 - alpha3) + recolored * alpha3
    result = np.clip(result, 0, 255).astype(np.uint8)

    out_path = os.path.join(OUT_FRAMES_DIR, os.path.basename(fpath))
    Image.fromarray(result, "RGB").save(out_path, "PNG")

    if (i + 1) % 30 == 0 or i == 0:
        print(f"  Processed frame {i+1}/{len(frames)}")

print(f"All {len(frames)} frames recolored")

# Step 3: Reassemble video
print("Reassembling video...")
subprocess.run([
    "ffmpeg", "-y",
    "-framerate", "30",
    "-i", os.path.join(OUT_FRAMES_DIR, "frame_%05d.png"),
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    OUTPUT_VIDEO
], capture_output=True, check=True)

print(f"Saved recolored video to {OUTPUT_VIDEO}")

# Verify
print("Verifying output...")
subprocess.run([
    "ffmpeg", "-y", "-i", OUTPUT_VIDEO,
    "-vframes", "1", "-q:v", "2",
    os.path.join(WORKDIR, "verify_frame.png")
], capture_output=True, check=True)

vimg = Image.open(os.path.join(WORKDIR, "verify_frame.png")).convert("RGB")
w, h = vimg.size
for label, pos in [("TL", (0,0)), ("TR", (w-1,0)), ("BL", (0,h-1)), ("BR", (w-1,h-1))]:
    print(f"  {label}: {vimg.getpixel(pos)}")
