# Prompts

This directory contains AI prompt templates and system instructions for Claude agents managing WordPress block plugin and theme releases.

## Purpose

Prompts in this directory help coordinate:

- **Agent Instructions** — Guidance for the release orchestration agent
- **Assistant Prompts** — System messages for Claude assistants
- **Task Descriptions** — Detailed workflow specifications
- **Validation Rules** — Compliance and quality criteria

## Available Prompts

### release.prompt.md

Complete prompt for release orchestration:
- Pre-release validation workflow
- Version management strategy
- Changelog coordination
- GitHub release process
- WordPress.org publishing
- Post-release handoff

**Used by:** Main `release` skill and coordinating agent

**Key Sections:**
- Phase 1: Repository Health Check
- Phase 2: Release Execution
- Phase 3: Publication & Handoff
- Integration points between sub-skills
- Error handling and troubleshooting

### changelog.prompt.md

Prompt for changelog management and generation:
- Keep a Changelog format validation
- Entry categorization (Added, Changed, Fixed, etc.)
- Version numbering and dating
- Release notes generation
- WordPress-specific changelog patterns

**Used by:** `changelog-management` skill

**Key Sections:**
- CHANGELOG.md format requirements
- Entry writing guidelines
- Validation rules
- Release note generation
- WordPress block-specific patterns

## Prompt Structure

Each prompt includes:

1. **Objective** — Clear goal for the agent/assistant
2. **Context** — WordPress block plugins/themes focus
3. **Workflow** — Step-by-step process
4. **Rules** — Validation and quality criteria
5. **Integration** — How it connects to other skills
6. **Examples** — Concrete examples for each section
7. **Error Handling** — Troubleshooting guide

## Using Prompts with Claude

### For Agent Instructions

When creating a custom agent:

```
Load prompt from: ./prompts/release.prompt.md
Use as: Agent system instructions
Integration: Links to sub-skills via [[skill-name]] syntax
```

### For Chat Mode

When working with Claude directly:

```
You can reference these prompts to understand the workflow:
- Main release flow: see ./prompts/release.prompt.md
- Changelog management: see ./prompts/changelog.prompt.md
```

### Custom Agent Example

```yaml
# In an agent configuration
system_prompt: file://./prompts/release.prompt.md
tools: [Read, Edit, Write, Bash, Grep, Glob]
sub_skills:
  - hook-configuration
  - pre-commit-validation
  - pre-push-validation
  - changelog-management
  - wordpress-org-sync
```

## Prompt Best Practices

### For Release Orchestration

✅ **Do:**
- Include clear phase breakdowns
- Reference sub-skills with [[skill-name]] syntax
- Provide error handling guidance
- Include concrete examples
- Link to WordPress documentation

❌ **Don't:**
- Assume WordPress knowledge
- Mix concerns from different skills
- Leave error cases undefined
- Omit WordPress.org requirements

### For Changelog Management

✅ **Do:**
- Show Keep a Changelog format examples
- Include WordPress-specific sections
- Provide before/after examples
- Reference the specification
- Include validation rules

❌ **Don't:**
- Invent changelog categories
- Mix plugin and theme patterns
- Omit required fields
- Use inconsistent date formats

## Creating New Prompts

### Prompt Template

```markdown
# [Skill Name] Prompt

## Objective
[Clear statement of what this prompt accomplishes]

## Context
[Why this matters for WordPress block projects]

## Workflow

### Phase 1: [Name]
[Description of this phase]
[Step-by-step instructions]

### Phase 2: [Name]
[Continued workflow]

## Rules

### Validation Rules
- Rule 1
- Rule 2

### Quality Criteria
- Criteria 1
- Criteria 2

## Integration

**Called by:** [[skill-that-uses-this]]
**Calls:** [[sub-skill-1]], [[sub-skill-2]]
**References:** Related skills

## Examples

### Example 1: [Scenario]
[Input]
→
[Process]
→
[Output]

### Example 2: [Scenario]
[Concrete example]

## Error Handling

### When [error condition]
**Diagnosis:** [How to identify]
**Fix:** [Solution steps]
**Prevention:** [How to avoid]

## Resources

- [External Link 1]
- [Reference 2]
```

## Skill-Prompt Mapping

| Skill | Prompt | Status |
|-------|--------|--------|
| release | release.prompt.md | ✅ Exists |
| changelog-management | changelog.prompt.md | ✅ Exists |
| hook-configuration | (planned) | ⚠️ TODO |
| pre-commit-validation | (planned) | ⚠️ TODO |
| pre-push-validation | (planned) | ⚠️ TODO |
| wordpress-org-sync | (planned) | ⚠️ TODO |

## TODO: Create Additional Prompts

- [ ] hook-configuration.prompt.md
- [ ] pre-commit-validation.prompt.md
- [ ] pre-push-validation.prompt.md
- [ ] wordpress-org-sync.prompt.md

## Maintaining Prompts

### When to Update

- New sub-skill is created
- Workflow changes significantly
- WordPress requirements change
- Tools or integrations change
- Error patterns are discovered

### Update Checklist

- [ ] Update objective if scope changed
- [ ] Add new integration points
- [ ] Add new examples
- [ ] Update error handling section
- [ ] Update related [[skill-name]] references
- [ ] Verify formatting
- [ ] Test with Claude

## Prompt Validation

### Self-Check Before Committing

1. **Clarity** — Is the objective obvious?
2. **Completeness** — Does it cover all phases?
3. **Examples** — Are examples concrete and relevant?
4. **Integration** — Are skill references correct?
5. **Format** — Does it follow markdown structure?
6. **WordPress** — Are requirements accurate?
7. **Links** — Do all references work?

## Integration with Skills

Prompts are used by:

1. **[[release]] skill** — Main orchestration
2. **[[changelog-management]]** — Changelog validation
3. **All sub-skills** — Individual workflow guidance
4. **Custom agents** — For extended functionality
5. **Claude assistant** — In conversational mode

## See Also

- [[release]] — Main release skill
- [[changelog-management]] — Changelog handling
- [[hook-configuration]] — Git hooks setup
- [[pre-commit-validation]] — Commit validation
- [[pre-push-validation]] — Push validation
- [[wordpress-org-sync]] — WordPress.org publishing

## Contributing

To add or update prompts:

1. Follow the template structure
2. Include concrete examples
3. Maintain WordPress block focus
4. Link to related skills with [[skill-name]]
5. Validate with Claude
6. Update this README
7. Commit with clear message

Example commit:
```
feat: Add hook-configuration.prompt.md

Includes lefthook setup workflow, configuration patterns,
and troubleshooting guide for git hook management.
```
