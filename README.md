# Five-Step Work Method

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
git clone https://github.com/agidesigner/five-step-method.git
cp -r five-step-method/.claude/skills/five-step-method ~/.claude/skills/
```

#### OpenClaw

```bash
git clone https://github.com/agidesigner/five-step-method.git
cp -r five-step-method/skills/five-step-method /path/to/openclaw/skills/
```

#### Codex (OpenAI)

```bash
cp five-step-method/AGENTS.md /path/to/your/project/AGENTS.md
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

## License

MIT
