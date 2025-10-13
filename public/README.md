# Video Assets

This directory contains the video assets for the Hero component.

## Required Videos

The Hero component expects the following video files:

- `demo-video.mp4` - Primary background video
- `demo-video-2.mp4` - Secondary background video  
- `demo-video-3.mp4` - Tertiary background video

## Video Specifications

For optimal performance and visual quality:

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) minimum
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Keep under 10MB per video for fast loading
- **Content**: Abstract, non-distracting backgrounds that work well with overlays

## Fallback Behavior

If videos fail to load, the component will gracefully fall back to:
1. Animated gradient background
2. Floating geometric shapes
3. Loading indicator

## Adding Your Own Videos

1. Replace the placeholder files with your own MP4 videos
2. Ensure they meet the specifications above
3. Test on different devices and network conditions
4. Consider using a CDN for production deployment

## Free Stock Video Resources

- [Pexels Videos](https://www.pexels.com/videos/)
- [Pixabay Videos](https://pixabay.com/videos/)
- [Unsplash Videos](https://unsplash.com/videos)
