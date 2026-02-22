import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects');
const SETTINGS_FILE = path.join(process.cwd(), 'src/content/settings/site.json');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/cms-data.json');

function parseMarkdown(content) {
    const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return { data: {}, content };

    const yamlContent = match[1];
    const data = {};

    yamlContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();

            // Clean quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            // Handle lists (simple check for -)
            if (value === '') {
                // Potential start of a list in the next lines?
                // For simplicity in this regex parser, we will handle our specific structure
            } else if (value.includes('[')) {
                // handle inline arrays like ["a", "b"]
                try {
                    data[key.trim()] = JSON.parse(value.replace(/'/g, '"'));
                } catch (e) {
                    data[key.trim()] = value;
                }
            } else {
                data[key.trim()] = value;
            }
        }
    });

    // Special handling for the lists we know we have (frames)
    // A better way would be a more robust YAML parser, but since we are doing this to avoid dependencies:
    const lines = yamlContent.split('\n');
    let currentKey = null;
    lines.forEach(line => {
        if (line.includes(':') && !line.trim().startsWith('-')) {
            currentKey = line.split(':')[0].trim();
        } else if (line.trim().startsWith('-') && currentKey) {
            if (!Array.isArray(data[currentKey])) {
                data[currentKey] = [];
            }
            let val = line.trim().slice(1).trim();
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            data[currentKey].push(val);
        }
    });

    return data;
}

function compile() {
    console.log('Compiling content...');

    const projects = [];
    const projectFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'));

    projectFiles.forEach(file => {
        const filePath = path.join(PROJECTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = parseMarkdown(content);
        projects.push(data);
    });

    // Sort projects if needed, e.g., by year descending
    projects.sort((a, b) => (b.year || '').localeCompare(a.year || ''));

    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));

    const output = {
        projects,
        settings
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    console.log(`Content compiled to ${OUTPUT_FILE}`);
}

compile();
