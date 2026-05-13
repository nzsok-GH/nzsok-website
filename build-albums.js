#!/usr/bin/env node
/**
 * build-albums.js
 * Netlify 빌드 시 _albums/ 폴더의 마크다운 파일들을 읽어
 * gallery/albums.json 으로 변환합니다.
 */

const fs = require('fs');
const path = require('path');

const ALBUMS_DIR = path.join(__dirname, '_albums');
// 수정 후 (루트에 생성)
const OUTPUT_FILE = path.join(__dirname, 'albums.json');

// Simple frontmatter parser (no dependencies needed)
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };

  const body = content.slice(match[0].length).trim();
  const data = {};
  const lines = match[1].split('\n');

  let currentKey = null;
  let currentList = null;
  let inPhotoItem = false;
  let photoItem = {};

  for (const line of lines) {
    // List item continuation
    if (line.startsWith('  - ') || line.startsWith('    ')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        // New photo item
        if (currentKey === 'photos') {
          if (inPhotoItem) currentList.push(photoItem);
          photoItem = {};
          inPhotoItem = true;
          const val = trimmed.slice(2).trim();
          if (val.includes(':')) {
            const [k, v] = val.split(/:\s+(.+)/);
            photoItem[k.trim()] = v ? v.trim().replace(/^["']|["']$/g, '') : '';
          }
        } else if (currentList) {
          currentList.push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ''));
        }
      } else if (inPhotoItem && trimmed.includes(':')) {
        const [k, v] = trimmed.split(/:\s+(.+)/);
        photoItem[k.trim()] = v ? v.trim().replace(/^["']|["']$/g, '') : '';
      }
      continue;
    }

    // Finish any ongoing list item
    if (inPhotoItem && !line.startsWith(' ')) {
      currentList.push(photoItem);
      photoItem = {};
      inPhotoItem = false;
    }

    if (!line.trim() || !line.includes(':')) continue;

    const colonIdx = line.indexOf(':');
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (value === '' || value === '[]') {
      // Start of a list
      currentKey = key;
      currentList = [];
      data[key] = currentList;
    } else if (value.startsWith('[')) {
      // Inline list
      data[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
      // Handle booleans
      if (data[key] === 'true') data[key] = true;
      if (data[key] === 'false') data[key] = false;
    }
  }

  // Push last photo item
  if (inPhotoItem && Object.keys(photoItem).length > 0) {
    currentList.push(photoItem);
  }

  return { data, body };
}

function buildAlbums() {
  // Ensure _albums directory exists
  if (!fs.existsSync(ALBUMS_DIR)) {
    console.log('📁 _albums 폴더가 없습니다. 빈 albums.json을 생성합니다.');
    fs.mkdirSync(ALBUMS_DIR, { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const files = fs.readdirSync(ALBUMS_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('📷 앨범 파일이 없습니다.');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const albums = files
    .map(filename => {
      const content = fs.readFileSync(path.join(ALBUMS_DIR, filename), 'utf8');
      const { data } = parseFrontmatter(content);
      return {
        ...data,
        slug: filename.replace('.md', '')
      };
    })
    .filter(a => a.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albums, null, 2));
  console.log(`✅ albums.json 생성 완료: ${albums.length}개 앨범`);
}

buildAlbums();
