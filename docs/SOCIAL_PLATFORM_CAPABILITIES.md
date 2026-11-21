# OmniSocial AI — Social Platform Integration Matrix

## Overview
OmniSocial AI integrates 13 major social media and messaging platforms using modular, provider-specific API adapters located in `src/lib/social/providers/`. Each provider implements official OAuth connection flows, permission validation, token refresh, publishing requirements, and capability detection.

---

## Capability Matrix across 13 Networks

| # | Platform | Official API Endpoint / Version | OAuth Flow | Publishing | Scheduling | Media Types | Inbox / DMs | Realtime Analytics | Live Integration Status |
|---|---|---|---|---|---|---|---|---|---|
| **1** | **Instagram** | Meta Graph API `v22.0` | Implemented | Reels, Stories, Carousels, Photos | Supported | Images (JPEG/PNG), Videos (MP4) | Comments & Direct Messages | Impressions, Reach, Engagement, Saves | IMPLEMENTED (Requires App Review) |
| **2** | **Facebook** | Meta Graph API `v22.0` | Implemented | Page Feed, Reels, Stories | Supported | Text, Images, Videos, Links | Page Comments & Messenger | Page Impressions, Post Reach, Likes | IMPLEMENTED (Requires App Review) |
| **3** | **YouTube** | Google Data API `v3` | Implemented | Videos, YouTube Shorts | Supported | Video (MP4, MOV), Thumbnails | Video Comments & Replies | Views, Watch Time, Subscribers | IMPLEMENTED (Requires Google OAuth Client) |
| **4** | **LinkedIn** | Community Management API `v2` | Implemented | Organization & Member Posts | Supported | Text, Single Image, Multi-Image, PDF | Company Comments | Clicks, Impressions, Reactions | IMPLEMENTED (Requires Marketing Dev Platform) |
| **5** | **X (Twitter)** | X API `v2` | Implemented | Tweets, Threads, Media Tweets | Supported | Text (280/4k char), Images, Video | Direct Messages, Mentions | Retweets, Impressions, Replies | IMPLEMENTED (Requires Basic/Pro Dev Tier) |
| **6** | **TikTok** | Content Posting API `v2` | Implemented | Short-form Videos, Photo Mode | Supported | Vertical Video (9:16), Images | Video Comments | Video Views, Profile Views, Shares | IMPLEMENTED (Requires TikTok Developer App) |
| **7** | **Pinterest** | Pinterest API `v5` | Implemented | Standard Pins, Idea Pins, Boards | Supported | Images (2:3 aspect ratio), Video | User Comments | Pin Clicks, Saves, Impressions | IMPLEMENTED (Requires Pinterest Dev App) |
| **8** | **Threads** | Meta Threads API `v1` | Implemented | Threads Posts, Carousels, Video | Supported | Text (500 chars), Images, Video | Replies & Mentions | Views, Likes, Quotes, Reposts | IMPLEMENTED (Requires Threads Scope) |
| **9** | **Google Business** | Google My Business API `v4.9` | Implemented | Updates, Offers, Events | Supported | Text, Photos, Action Call Buttons | Customer Reviews & Q&A | Local Search Views, Direction Requests | IMPLEMENTED (Requires Account Verification) |
| **10** | **WhatsApp** | Cloud API `v22.0` | Implemented | Template Messages, Interactive | Supported | Text, Media Attachments, Documents | Two-Way Messaging Conversations | Message Delivery & Read Rates | IMPLEMENTED (Requires Meta Business Manager) |
| **11** | **Telegram** | Bot API `v7.0` | Implemented | Channel Broadcasts, Group Posts | Supported | Formatted Markdown, Photos, Videos | Group Discussions & Bot Chats | Post View Counts, Forwards | IMPLEMENTED (Requires Bot Token) |
| **12** | **Reddit** | Reddit Data API `v1` | Implemented | Subreddit Submissions, Links | Supported | Text, Link, Images | Post Comments & Replies | Upvotes, Downvotes, Comment Count | IMPLEMENTED (Requires Reddit App ID) |
| **13** | **Snapchat** | Creative Kit / Marketing API `v1` | Implemented | Stories, Camera Lenses | Supported | Vertical Fullscreen Video/Photos | Direct Messaging (Restricted) | Story Views, Completions | IMPLEMENTED (Requires Snap Kit Approved Account) |

---

## Media Validation Rules by Platform

1. **Instagram**:
   - Aspect ratio: Square `1:1`, Portrait `4:5`, Landscape `1.91:1`, Reels `9:16`.
   - Max image size: 8 MB. Max video length: 90 seconds (Reels) / 60 seconds (Feed).
2. **Facebook**:
   - Aspect ratio: `16:9`, `1:1`, `9:16` for Reels.
   - Max video size: 4 GB. Max length: 240 minutes.
3. **YouTube**:
   - Resolution: Up to 4K (3840x2160). Shorts strictly `9:16` vertical video up to 60 seconds.
4. **LinkedIn**:
   - Documents: PDF up to 100 MB / 300 pages. Images up to 10 MB.
5. **X (Twitter)**:
   - Images: Up to 4 images per tweet (PNG, JPEG, WEBP). Video: Up to 140 seconds (up to 2 hours for X Premium).
