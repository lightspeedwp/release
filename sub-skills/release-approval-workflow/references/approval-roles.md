# Approval Roles and Responsibilities

Define who can approve what and what authority they hold in the release approval workflow.

## Role Hierarchy

```
├── Release Requestor (Developer)
│   └── Can request approvals
│   └── Can make changes during review
│   └── Cannot approve their own release
│
├── Security Lead
│   ├── Authority: Security Review Gate
│   ├── Authority: SAST/Dependency Review
│   ├── Authority: Override Security Findings (with justification)
│   └── Authority: Emergency Override Authorization
│
├── QA Lead
│   ├── Authority: QA Review Gate
│   ├── Authority: Test Coverage Approval
│   ├── Authority: Override Low Coverage (with known issues)
│   └── Authority: Release Quality Sign-Off
│
├── Product Manager (Optional)
│   ├── Authority: Feature Validation
│   ├── Authority: Documentation Review
│   └── Authority: Release Readiness (optional)
│
└── Compliance Lead (Optional)
    ├── Authority: WordPress Standards Review
    ├── Authority: Regulatory Compliance
    └── Authority: Legal/GDPR Review
```

## Detailed Roles

### Security Lead

**Primary Authority:** Security Review Gate

**Required for:** All releases

**Responsibilities:**

- Run SAST (Static Application Security Testing) scans
- Execute dependency vulnerability audits
- Validate security headers and configurations
- Review sanitization and escaping practices
- Verify nonce implementation on forms
- Check capability-based access control
- Assess overall security risk level
- Approve or reject release based on security findings

**Approval Requirements:**

- Zero critical vulnerabilities
- Zero high-severity vulnerabilities
- Medium-severity findings must be documented and justified
- Low-severity findings auto-approved if < 5 findings
- All findings must have remediation or mitigation documented

**Can Override:**

- Medium/Low severity findings (with justification)
- Auto-approval threshold (can manually approve despite some findings)
- Security header warnings (if business justified)

**Cannot Override:**

- Critical vulnerabilities
- Unpatched dependency vulnerabilities
- SQL injection or XSS findings

**Escalation Path:**

1. Security Lead reviews findings
2. If conflicted, escalate to CISO/Security Director
3. Emergency override requires executive approval
4. Document business justification in audit trail

**Training & Certification:**

- OWASP Top 10 familiarity required
- Secure coding practices knowledge
- Regular SAST tool training
- Annual security review certification

---

### QA Lead

**Primary Authority:** QA Review Gate

**Required for:** All releases

**Responsibilities:**

- Execute test suite and verify all tests pass
- Check code coverage metrics (minimum 70%)
- Validate test coverage for critical paths
- Review test quality and comprehensiveness
- Verify documentation accuracy
- Validate changelog completeness
- Confirm version numbering (SemVer compliance)
- Sign off on release quality

**Approval Requirements:**

- All tests passing on minimum supported versions
- Code coverage >= 70% (configurable per project)
- Critical features have integration tests
- Changelog has entries for all changes
- Version format follows MAJOR.MINOR.PATCH
- README and documentation updated
- Known issues documented
- Performance baselines maintained

**Can Override:**

- Coverage between 60-70% (with known issues documentation)
- Skip tests for specific platform (if documented)
- Approve despite minor edge case gaps (if documented)

**Cannot Override:**

- Failing tests
- Coverage < 60%
- Critical path not tested
- Undocumented changes

**Escalation Path:**

1. QA Lead addresses concerns with developer
2. If coverage gap, escalate to Product Manager
3. For critical path gaps, escalate to Engineering Lead
4. For unknown issues, block release and escalate

**Training & Certification:**

- Test-driven development practices
- Coverage analysis interpretation
- Selenium/Playwright expertise (if E2E testing required)
- Quality metrics and KPIs
- Annual QA certification

---

### Product Manager (Optional)

**Primary Authority:** Product Review Gate (when enabled)

**Required for:** Feature releases, major version bumps

**Responsibilities:**

- Verify all advertised features are included
- Confirm customer-facing documentation accuracy
- Validate release notes completeness
- Assess feature parity with roadmap
- Review customer impact assessment
- Determine backward compatibility status
- Approve messaging and positioning

**Approval Requirements:**

- Feature set matches roadmap/scope
- Release notes match actual features
- Backward compatibility clearly documented
- Customer impact assessed
- Known limitations documented
- Upgrade path clear for major version changes

**Can Override:**

- Feature scope (with Product Director approval)
- Release messaging (with Marketing review)

**Cannot Override:**

- Security findings
- Test failures
- Compliance issues

**Escalation Path:**

1. Product Manager works with stakeholders
2. Escalate scope disputes to Product Director
3. For customer impact concerns, escalate to Customer Success
4. For messaging issues, escalate to Marketing

---

### Compliance Lead (Optional)

**Primary Authority:** Compliance Review Gate (when enabled)

**Required for:** Major releases, WordPress.org submissions, regulated environments

**Responsibilities:**

- Verify WordPress plugin/theme standards compliance
- Review plugin header format and metadata
- Validate text domain and l10n compliance
- Check privacy and GDPR compliance
- Review license compliance
- Assess data handling practices
- Document any compliance exceptions

**Approval Requirements:**

- Plugin header format valid and complete
- Text domain consistent with plugin slug
- All strings marked for translation
- Privacy policy updated if needed
- GDPR compliance statement present
- License file included (if applicable)
- No banned/restricted practices

**Can Override:**

- Minor header inconsistencies (with fixes documented)
- Partial translation coverage (with plan for completion)

**Cannot Override:**

- Privacy/GDPR violations
- License conflicts
- Banned WordPress practices (e.g., call home without consent)

**Escalation Path:**

1. Compliance Lead documents findings
2. For policy conflicts, escalate to Legal
3. For GDPR issues, escalate to Data Protection Officer
4. For banned practices, block release and escalate to WordPress.org liaison

---

### Senior/Backup Approvers

**Optional second-level approvals** for additional review:

- **Senior Security Lead**: For critical vulnerabilities or security overrides
- **Senior QA Lead**: For coverage gaps or test failures
- **Engineering Lead**: For architectural or compatibility concerns
- **Release Manager**: For release coordination and timeline decisions

**Responsibilities:**

- Provide second opinion on contentious decisions
- Review approver decisions for consistency
- Handle escalations and appeals
- Ensure process compliance
- Track approval metrics and SLAs

---

## Role Assignment Rules

### Separation of Duties

```yaml
cannot_approve_same_release:
  - "Developer who implemented changes"
  - "Author of feature code"
  - "Person who created PR"

can_approve:
  - Security Lead (not involved in feature development)
  - QA Lead (dedicated QA role)
  - Product Manager (from product team)
  - Compliance Lead (independent compliance function)
```

### Availability Requirements

- **Security Lead**: Must be available within 24 hours
- **QA Lead**: Must be available within 24 hours
- **Product Manager**: Must be available within 48 hours (optional)
- **Compliance Lead**: Must be available within 72 hours (optional)

### Backup/Override Rules

If primary approver unavailable:

1. Escalate to next level in hierarchy
2. If no one available in 24 hours, escalate to manager
3. For emergency releases, executive override available
4. Log override reason and approver in audit trail

---

## Approval SLA (Service Level Agreement)

### Standard Release Timeline

```
Requested        → Security Review  → QA Review     → Publish
      ↓              (24 hrs)           (24 hrs)
  Start            Auto-block if no  Auto-block if  
              →    findings after 24h no approval
```

### Fast-Track Timeline (Hotfixes)

```
Requested        → Security Review  → Publish
      ↓              (8 hours)     
  Start          → QA notification
                    (parallel)
```

### Enterprise Timeline (Compliance)

```
Requested        → Security Review  → QA Review     → Compliance    → Publish
      ↓              (24 hrs)         (24 hrs)         (48 hrs)
  Start
```

---

## Approval Workflow State Machine

```
[Requested]
    ↓
[Awaiting Security Review]
    ├─→ [Security Approved] ──→ [Awaiting QA Review]
    ├─→ [Security Rejected] ──→ [Needs Changes]
    └─→ [Security Override] ──→ [Awaiting QA Review]
                                   ↓
                              [QA Approved] ──→ [Ready to Release]
                                   ↓
                              [QA Rejected] ──→ [Needs Changes]
                                   ↓
                              [QA Override] ──→ [Ready to Release]
                                                  ↓
                                           [Released]
```

---

## Role Transition Process

### Adding a New Approver

1. Identify required role and authority level
2. Confirm person has necessary expertise/certification
3. Update approval configuration files
4. Notify all release team members
5. Document transition in release notes
6. Log change in authorization audit trail

### Removing an Approver

1. Identify replacement approver
2. Brief replacement on pending releases
3. Update approval configuration files
4. Notify all stakeholders
5. Document transition with effective date
6. Archive removed approver's authority records

### Temporary Delegation

For extended absence (vacation, leave):

1. Identify qualified backup approver
2. Confirm backup has necessary authority
3. Create delegation record with start/end dates
4. Update approval workflow to route to backup
5. Notify all stakeholders
6. Log delegation in audit trail
7. Remove delegation on return date

---

## Conflict Resolution

### Approval Conflicts

**When two approvers disagree:**

1. Document both positions in audit trail
2. Both must add comments explaining rationale
3. Escalate to manager level or Release Manager
4. Release Manager makes final decision
5. Document decision and reasoning
6. Record tie-breaker authority used

### Overdue Approvals

**When approval takes > SLA:**

1. Send escalation notification to approver
2. Escalate to manager after 2 hours overdue
3. Escalate to release coordinator after 4 hours
4. Can use emergency override after 24 hours (with executive approval)
5. Document escalation and reasons in audit trail

### Appeals Process

**If developer disagrees with rejection:**

1. Document appeal rationale in GitHub issue
2. Escalate to approver's manager
3. Manager reviews decision with original approver
4. Decision upheld or overturned with new approval
5. Document appeals outcome in audit trail

---

## Approval Metrics & KPIs

Track approval workflow health:

- **Approval SLA Compliance**: % of approvals completed within SLA
- **Average Approval Time**: Mean time from request to completion per stage
- **Rejection Rate**: % of approvals rejected per approver
- **Override Rate**: % of approvals with overrides per stage
- **Conflict Rate**: % of approvals escalated per period
- **Approver Availability**: % of time approver available within SLA
- **Bottleneck Stages**: Which approval stage takes longest

Review metrics monthly and adjust SLAs as needed.
