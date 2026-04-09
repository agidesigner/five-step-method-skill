#!/usr/bin/env node
/**
 * five-step-method installer
 *
 * Usage:
 *   npx five-step-method                 # auto-detect & install everywhere it can
 *   npx five-step-method claude-code     # install only to Claude Code (~/.claude/skills)
 *   npx five-step-method cursor          # install to current project's .cursor/rules
 *   npx five-step-method windsurf        # write to current project's .windsurfrules
 *   npx five-step-method cline           # install to current project's .clinerules
 *   npx five-step-method codex           # copy AGENTS.md to current project root
 *   npx five-step-method --list          # list supported targets
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const SKILL_SRC = path.join(ROOT, 'skills', 'five-step-method');
const SKILL_MD = path.join(SKILL_SRC, 'SKILL.md');
const AGENTS_MD = path.join(ROOT, 'AGENTS.md');

const HOME = os.homedir();
const CWD = process.cwd();

// Each handler returns the path it wrote to (or throws on failure).
const TARGETS = {
  'claude-code': {
    description: 'Claude Code (~/.claude/skills/five-step-method)',
    install() {
      const dst = path.join(HOME, '.claude', 'skills', 'five-step-method');
      copyDir(SKILL_SRC, dst);
      return dst;
    },
  },
  'cursor': {
    description: 'Cursor (./.cursor/rules/five-step-method.md)',
    install() {
      const dst = path.join(CWD, '.cursor', 'rules', 'five-step-method.md');
      ensureDir(path.dirname(dst));
      fs.copyFileSync(SKILL_MD, dst);
      return dst;
    },
  },
  'windsurf': {
    description: 'Windsurf (./.windsurfrules)',
    install() {
      const dst = path.join(CWD, '.windsurfrules');
      mergeOrWrite(dst, fs.readFileSync(SKILL_MD, 'utf8'));
      return dst;
    },
  },
  'cline': {
    description: 'Cline (./.clinerules)',
    install() {
      const dst = path.join(CWD, '.clinerules');
      mergeOrWrite(dst, fs.readFileSync(SKILL_MD, 'utf8'));
      return dst;
    },
  },
  'codex': {
    description: 'Codex / OpenAI agents (./AGENTS.md)',
    install() {
      const dst = path.join(CWD, 'AGENTS.md');
      fs.copyFileSync(AGENTS_MD, dst);
      return dst;
    },
  },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dst) {
  ensureDir(dst);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// Append to file if it exists; otherwise create. Skip if marker already present.
function mergeOrWrite(dst, content) {
  const marker = '<!-- five-step-method:begin -->';
  const block = `\n${marker}\n${content}\n<!-- five-step-method:end -->\n`;
  if (fs.existsSync(dst)) {
    const existing = fs.readFileSync(dst, 'utf8');
    if (existing.includes(marker)) return; // already installed
    fs.writeFileSync(dst, existing + block);
  } else {
    fs.writeFileSync(dst, block.trimStart());
  }
}

function detectInstalled() {
  // Heuristic: install to claude-code if ~/.claude exists, plus any agent
  // whose config file/dir is already present in the current project.
  const picks = [];
  if (fs.existsSync(path.join(HOME, '.claude'))) picks.push('claude-code');
  if (fs.existsSync(path.join(CWD, '.cursor'))) picks.push('cursor');
  if (fs.existsSync(path.join(CWD, '.windsurfrules'))) picks.push('windsurf');
  if (fs.existsSync(path.join(CWD, '.clinerules'))) picks.push('cline');
  if (fs.existsSync(path.join(CWD, 'AGENTS.md'))) picks.push('codex');
  return picks.length ? picks : ['claude-code'];
}

function listTargets() {
  console.log('Supported targets:');
  for (const [name, t] of Object.entries(TARGETS)) {
    console.log(`  ${name.padEnd(14)} ${t.description}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*\*?/, '').trim());
    return;
  }
  if (args.includes('--list')) {
    listTargets();
    return;
  }

  const picks = args.length ? args : detectInstalled();

  let ok = 0;
  for (const name of picks) {
    const target = TARGETS[name];
    if (!target) {
      console.error(`✗ Unknown target: ${name}`);
      continue;
    }
    try {
      const dst = target.install();
      console.log(`✓ ${name.padEnd(14)} → ${dst}`);
      ok++;
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    }
  }

  if (ok === 0) {
    console.error('\nNo targets installed. Run with --list to see available targets.');
    process.exit(1);
  }
  console.log(`\nDone. Installed five-step-method to ${ok} target(s).`);
}

main();
