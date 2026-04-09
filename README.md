# Five-Step Work Method

[![npm version](https://img.shields.io/npm/v/five-step-method.svg?color=cb3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/five-step-method)
[![npm downloads](https://img.shields.io/npm/dm/five-step-method.svg?color=cb3837)](https://www.npmjs.com/package/five-step-method)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/agidesigner/five-step-method-skill?style=social)](https://github.com/agidesigner/five-step-method-skill/stargazers)

> If this skill helps your AI agents make better decisions, **give it a ⭐ on [GitHub](https://github.com/agidesigner/five-step-method-skill)** — every star helps another team avoid over-engineering and scope creep.

An engineering decision framework for AI coding agents, based on Elon Musk's five-step methodology. Battle-tested through a real production deployment cycle.

## What It Does

Teaches AI agents to **evaluate requirements before acting** — whether writing code, making product decisions, planning strategy, or designing processes. Prevents the most common failure: solving problems that don't exist, or solving real problems with unnecessary complexity.

## The Five Steps

1. **Question** — Is this actually needed?
2. **Delete** — Remove what shouldn't exist
3. **Simplify** — Find the minimum reliable solution
4. **Accelerate** — Speed up what remains
5. **Automate** — Only automate validated processes

Most decisions end at Step 3.

## Install

### Quick install (recommended) — one command

Auto-detects which AI agents you have and installs the skill into the right place. No clone, no manual file copying.

```bash
npx five-step-method
```

Want to target a specific agent only?

```bash
npx five-step-method claude-code   # → ~/.claude/skills/five-step-method
npx five-step-method cursor        # → ./.cursor/rules/five-step-method.md
npx five-step-method windsurf      # → ./.windsurfrules
npx five-step-method cline         # → ./.clinerules
npx five-step-method codex         # → ./AGENTS.md
npx five-step-method --list        # show all supported targets
```

The installer is idempotent — running it twice won't duplicate content. For Windsurf/Cline, it wraps the skill in `<!-- five-step-method:begin/end -->` markers so it doesn't clobber your existing rules.

> Published as [`five-step-method`](https://www.npmjs.com/package/five-step-method) on npm.

### Manual install

If you'd rather copy files yourself:

#### Claude Code

```bash
git clone https://github.com/agidesigner/five-step-method-skill.git
cp -r five-step-method-skill/.claude/skills/five-step-method ~/.claude/skills/
```

#### OpenClaw

```bash
git clone https://github.com/agidesigner/five-step-method-skill.git
cp -r five-step-method-skill/skills/five-step-method /path/to/openclaw/skills/
```

#### Codex (OpenAI)

```bash
cp five-step-method-skill/AGENTS.md /path/to/your/project/AGENTS.md
```

#### Cursor / Windsurf / Cline

Copy the content of `SKILL.md` into your project's custom instructions file (`.cursorrules`, `.windsurfrules`, or agent system prompt).

## Structure

```
five-step-method/
├── .claude/skills/five-step-method/
│   └── SKILL.md              # Claude Code
├── skills/five-step-method/
│   └── SKILL.md              # OpenClaw
├── AGENTS.md                 # Codex (same content)
├── skill.json                # Manifest
└── README.md
```

## Origin

Extracted from a session where an AI agent:
- Built an auto-detection system → caused 3 production 500 errors
- Force-pushed tags 4x → blocked every deployment
- Stacked 5 untested changes → each fix introduced a new bug
- Eventually rolled back everything

After applying this method, the same problems were solved with single-line config changes.

## Key Insight

> The best code is code you didn't write. The best feature is the one you deleted. The best config is one line in `.env`.

## Author

**Ajin** — [@ajinpro](https://x.com/ajinpro)

Founder @ [Jogg.ai](http://jogg.ai) | Building AI for Marketing

## Show Your Support

If the Five-Step Method has saved you from over-engineering, scope creep, or shipping the wrong feature, here's how you can help others find it:

- **⭐ Star this repo** — the single biggest signal that helps other developers discover it on GitHub
- **Share it** with teammates who use Claude Code, Cursor, Windsurf, Cline, or Codex
- **Use it in your own projects** — `npx five-step-method` and tell people where you got it
- **Open an issue** with feedback, bug reports, or new agent integrations
- **Tweet about it** and tag [@ajinpro](https://x.com/ajinpro)

Every star pushes this skill into more developers' workflows — and every prevented over-engineered feature is a small win for the whole industry.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=agidesigner/five-step-method-skill&type=Date)](https://star-history.com/#agidesigner/five-step-method-skill&Date)

## License

MIT
