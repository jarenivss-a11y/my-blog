import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const MINIMAX_GROUP_ID = process.env.MINIMAX_GROUP_ID;

const categoryPrompts = {
  daily: 'A cozy hand-drawn illustration of daily life moments, warm coffee cup on windowsill, sunlight streaming through curtains, sketch style with soft pencil strokes',
  music: 'A hand-drawn illustration of music notes floating around headphones and vinyl record, acoustic guitar silhouette, warm artistic sketch style',
  books: 'A hand-drawn illustration of stacked books with reading glasses, cozy reading nook atmosphere, pencil sketch with warm tones',
  ecommerce: 'A hand-drawn illustration of online shopping concept, laptop with shopping cart, delivery boxes, growth charts, sketch style business illustration',
  pokemon: 'A hand-drawn illustration of Pokéball and cute Pokemon silhouettes, trainer silhouette, adventure atmosphere, pencil sketch style'
};

const categoryColors = {
  daily: ['#ffe4c4', '#fff5e6'],
  music: ['#e8d5f2', '#f5e8ff'],
  books: ['#fff0d4', '#fff5e6'],
  ecommerce: ['#d4f5e8', '#e8fff5'],
  pokemon: ['#d4e8ff', '#e6f0ff']
};

async function generateCoverImage(category, title) {
  const prompt = categoryPrompts[category] || categoryPrompts.daily;
  const colors = categoryColors[category] || categoryColors.daily;

  const fullPrompt = `${prompt}, title: ${title}, paper texture background with warm cream color ${colors[0]}, hand-drawn doodle style with dashed borders`;

  console.log(`Generating image for "${title}" in category "${category}"...`);

  try {
    const response = await fetch('https://api.minimax.chat/v1/image_generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'image-01',
        prompt: fullPrompt,
        aspect_ratio: '3:2',
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.data?.[0]?.url;
  } catch (error) {
    console.error(`Failed to generate image for ${title}:`, error.message);
    return null;
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved: ${filepath}`);
    return true;
  } catch (error) {
    console.error(`Failed to download image:`, error.message);
    return false;
  }
}

function updateFrontmatter(filepath, coverPath) {
  let content = fs.readFileSync(filepath, 'utf-8');

  if (content.includes('cover:')) {
    content = content.replace(/cover:.*\n/, `cover: "${coverPath}"\n`);
  } else {
    const lines = content.split('\n');
    const insertIndex = lines.findIndex(line => line.startsWith('---') && line !== lines[0]);
    if (insertIndex !== -1) {
      lines.splice(insertIndex + 1, 0, `cover: "${coverPath}"`);
      content = lines.join('\n');
    }
  }

  fs.writeFileSync(filepath, content);
  console.log(`Updated frontmatter: ${filepath}`);
}

function getPostInfoFromFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');

  let inFrontmatter = false;
  const frontmatter = {};

  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        break;
      }
    }

    if (inFrontmatter && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  }

  return {
    title: frontmatter.title || path.basename(filepath, '.md'),
    category: frontmatter.category || 'daily'
  };
}

async function main() {
  if (!MINIMAX_API_KEY) {
    console.error('Error: MINIMAX_API_KEY environment variable is required');
    process.exit(1);
  }

  const blogDir = path.join(ROOT, 'src', 'content', 'blog');
  const coversDir = path.join(ROOT, 'public', 'covers');

  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  const categories = fs.readdirSync(blogDir);

  for (const category of categories) {
    const categoryPath = path.join(blogDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filepath = path.join(categoryPath, file);
      const postInfo = getPostInfoFromFile(filepath);
      const slug = file.replace('.md', '');
      const coverFilename = `${category}-${slug}.png`;
      const coverPath = `/covers/${coverFilename}`;
      const fullCoverPath = path.join(coversDir, coverFilename);

      // Skip if cover already exists
      if (fs.existsSync(fullCoverPath)) {
        console.log(`Cover already exists for ${postInfo.title}, skipping...`);
        continue;
      }

      const imageUrl = await generateCoverImage(category, postInfo.title);

      if (imageUrl) {
        const success = await downloadImage(imageUrl, fullCoverPath);
        if (success) {
          updateFrontmatter(filepath, coverPath);
        }
      }

      // Rate limiting - wait a bit between requests
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log('Done!');
}

main().catch(console.error);
