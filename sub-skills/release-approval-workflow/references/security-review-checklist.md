# Security Review Checklist

Comprehensive security validation requirements for release approval workflow.

## SAST (Static Application Security Testing) Checks

### Code Injection Vulnerabilities

- [ ] **SQL Injection**
  - [ ] All database queries use `wpdb->prepare()`
  - [ ] No direct string concatenation in queries
  - [ ] Parameterized queries for custom table access
  - [ ] No dynamic query construction without sanitization
  - Reference: [WordPress WPDB Documentation](https://developer.wordpress.org/plugins/security/data-validation/)

- [ ] **Cross-Site Scripting (XSS)**
  - [ ] All user input escaped with appropriate functions
  - [ ] Output escaped with `esc_html()`, `esc_attr()`, `esc_url()`
  - [ ] JavaScript context uses `wp_json_encode()` + `esc_attr()`
  - [ ] No `eval()` or `create_function()` usage
  - [ ] No direct `echo` of unsanitized data
  - Reference: [WordPress Escaping Guide](https://developer.wordpress.org/plugins/security/securing-output/)

- [ ] **Command Injection**
  - [ ] No `exec()`, `system()`, `passthru()` usage
  - [ ] If shell commands needed, use `escapeshellarg()`, `escapeshellcmd()`
  - [ ] Prefer native PHP functions over shell commands
  - [ ] No user input passed to shell functions

- [ ] **Remote Code Execution (RCE)**
  - [ ] No `include`/`require` with user-controlled paths
  - [ ] No dynamic function calls with user input
  - [ ] No `unserialize()` of untrusted data
  - [ ] No `eval()` or variable variables (`$$var`)
  - [ ] File uploads stored outside web root or served as download

### Input Validation & Sanitization

- [ ] **Input Sanitization**
  - [ ] All form inputs sanitized on receipt
  - [ ] Use `sanitize_text_field()` for text inputs
  - [ ] Use `sanitize_email()` for email inputs
  - [ ] Use `sanitize_url()` for URLs
  - [ ] Use custom sanitization for structured data
  - [ ] Never trust `$_GET`, `$_POST`, `$_REQUEST`

- [ ] **Input Validation**
  - [ ] Whitelist validation used where possible
  - [ ] Type checking on numeric inputs
  - [ ] Array validation for multi-value inputs
  - [ ] File type validation (MIME, extension, content)
  - [ ] Max length validation on all text inputs
  - [ ] Format validation (regex) for structured data

- [ ] **Data Integrity**
  - [ ] Checksums/hashes for critical data
  - [ ] Integrity checks before processing
  - [ ] No assumptions about data format
  - [ ] Defensive parsing of external data

### Authentication & Authorization

- [ ] **Nonces**
  - [ ] Nonce generated with `wp_create_nonce()`
  - [ ] Nonce verified with `wp_verify_nonce()` on form submission
  - [ ] Unique nonce per form type
  - [ ] Nonce checked before any privileged action
  - [ ] Nonce value not logged or exposed

- [ ] **Capabilities**
  - [ ] All privileged actions check `current_user_can()`
  - [ ] Use principle of least privilege
  - [ ] Custom capabilities properly registered
  - [ ] Capability checks on AJAX/API endpoints
  - [ ] Role-based capability checks documented

- [ ] **Access Control**
  - [ ] Admin pages use `is_admin()`
  - [ ] Front-end pages check appropriate capabilities
  - [ ] User ID validation on personal data access
  - [ ] No direct ID access without capability check
  - [ ] CORS headers properly configured (if API)

### Data Security

- [ ] **Sensitive Data Handling**
  - [ ] Passwords never logged or displayed
  - [ ] API keys/tokens not hardcoded
  - [ ] Passwords hashed with `wp_hash_password()`
  - [ ] Sensitive data not passed in URLs
  - [ ] Debug logging doesn't expose secrets
  - [ ] No personal data exposure in error messages

- [ ] **Password Security**
  - [ ] Password verification uses `wp_check_password()`
  - [ ] Password requirements enforced if changing
  - [ ] No password hints or recovery bypass
  - [ ] Rate limiting on login attempts
  - [ ] Secure password reset token generation

- [ ] **Encryption**
  - [ ] Sensitive data encrypted at rest (if applicable)
  - [ ] HTTPS required for transmission
  - [ ] Use WordPress `wp_encrypt_post_meta()` or alternatives
  - [ ] Encryption keys properly managed
  - [ ] No custom encryption implementations

### Session & Cookie Security

- [ ] **Session Management**
  - [ ] WordPress nonce system used (not custom sessions)
  - [ ] Session timeout enforced
  - [ ] Session data not exposed in logs
  - [ ] Session fixation protection in place
  - [ ] Session data validated on each request

- [ ] **Cookies**
  - [ ] HTTPOnly flag set on sensitive cookies
  - [ ] Secure flag set on HTTPS sites
  - [ ] SameSite attribute configured
  - [ ] Cookie domain/path properly scoped
  - [ ] Cookie values not user-controllable

### File & Upload Security

- [ ] **File Uploads**
  - [ ] Uploads validated and sanitized
  - [ ] File type restricted (whitelist)
  - [ ] Uploads stored outside web root (if possible)
  - [ ] Filename sanitized: `sanitize_file_name()`
  - [ ] File size limits enforced
  - [ ] Duplicate file handling (rename/reject)
  - [ ] Virus scanning for sensitive uploads

- [ ] **File Access**
  - [ ] File path traversal prevented
  - [ ] `..` sequences blocked in paths
  - [ ] Symbolic link attacks prevented
  - [ ] Temporary files properly cleaned up
  - [ ] File permissions restrictive (0644 files, 0755 dirs)

- [ ] **Code Inclusion**
  - [ ] No `include()` with user paths
  - [ ] Plugin/theme files not user-accessible
  - [ ] Sensitive files (db backup, config) not in web root
  - [ ] `.htaccess` protects sensitive directories
  - [ ] Web server configured to deny script execution in upload dirs

### Database Security

- [ ] **Query Security**
  - [ ] All queries use `wpdb->prepare()`
  - [ ] Custom SQL uses parameterized statements
  - [ ] Table names validated/escaped
  - [ ] Column names validated/escaped
  - [ ] Database operations logged appropriately

- [ ] **Table Operations**
  - [ ] Custom tables use `$wpdb->prefix`
  - [ ] Table creation uses `dbDelta()` properly
  - [ ] Table cleanup on uninstall
  - [ ] Foreign key relationships documented
  - [ ] Indexes on frequently queried columns

- [ ] **Sensitive Data in DB**
  - [ ] Passwords hashed (never plain text)
  - [ ] API keys encrypted or token-based
  - [ ] PII encrypted or pseudonymized
  - [ ] Audit logs preserved (not deleted)
  - [ ] Data retention policy documented

### API Security (if applicable)

- [ ] **REST API Endpoints**
  - [ ] Endpoints require authentication
  - [ ] Capability checks enforced
  - [ ] Rate limiting implemented
  - [ ] Input validation on all parameters
  - [ ] Output properly escaped/filtered
  - [ ] No sensitive data in responses
  - [ ] CORS configured appropriately

- [ ] **API Authentication**
  - [ ] OAuth or token-based auth (not cookie-only)
  - [ ] API keys not exposed in client-side code
  - [ ] Token expiration enforced
  - [ ] Revocation mechanism available
  - [ ] Audit trail of API access

### Dependency Security

- [ ] **Composer Dependencies**
  - [ ] No known vulnerabilities (composer audit)
  - [ ] All dependencies have proper licenses
  - [ ] Minimal dependency set (no bloat)
  - [ ] Dependencies regularly updated
  - [ ] Dependency compatibility verified
  - [ ] No abandoned packages

- [ ] **NPM Dependencies** (if frontend tooling)
  - [ ] No known vulnerabilities (npm audit)
  - [ ] License compliance verified
  - [ ] Production vs dev dependencies correct
  - [ ] No sensitive data in dependencies
  - [ ] Dependencies pinned or locked

### Error Handling & Logging

- [ ] **Error Handling**
  - [ ] No stack traces exposed to users
  - [ ] Generic error messages for users
  - [ ] Detailed errors logged internally
  - [ ] Errors logged with context (user, time, action)
  - [ ] Error severity properly classified

- [ ] **Logging Security**
  - [ ] No sensitive data logged (passwords, tokens, keys)
  - [ ] Logs stored securely (not accessible via web)
  - [ ] Log retention policy enforced
  - [ ] Log access limited to authorized personnel
  - [ ] Logs protect PII (masked, encrypted, or restricted)

### WordPress-Specific Security

- [ ] **Plugin Standards**
  - [ ] Plugin header format valid
  - [ ] Text domain consistent with plugin slug
  - [ ] All strings marked for translation
  - [ ] No global variable pollution
  - [ ] Proper use of filters and actions

- [ ] **Escaping & Sanitization**
  - [ ] Admin pages escape output
  - [ ] Frontend pages escape output
  - [ ] Form inputs sanitized
  - [ ] Custom post types escape metadata
  - [ ] Shortcodes escape attributes

- [ ] **Hooks & Filters**
  - [ ] Filter usage on output
  - [ ] Action usage for extensibility
  - [ ] Custom actions documented
  - [ ] Custom filters documented
  - [ ] Hook priorities sensible

- [ ] **Transients & Caching**
  - [ ] Transients used for performance (not security)
  - [ ] Cache invalidation on data change
  - [ ] Sensitive data not cached
  - [ ] Cache keys properly namespaced
  - [ ] Cache expiration set appropriately

## Manual Security Review Items

### Code Quality

- [ ] Code follows WordPress coding standards
- [ ] Functions are well-documented with PHPDoc
- [ ] Complex logic has inline comments
- [ ] Dead code removed
- [ ] No commented-out code left in production

### Security Headers (if applicable)

- [ ] X-Frame-Options set (clickjacking protection)
- [ ] Content-Security-Policy configured
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection configured
- [ ] Referrer-Policy set appropriately
- [ ] Permissions-Policy configured

### HTTPS & TLS

- [ ] HTTPS required for admin pages
- [ ] Mixed content warnings addressed
- [ ] SSL certificate valid and current
- [ ] TLS 1.2+ enforced
- [ ] Deprecated SSL/TLS versions disabled

### Third-Party Integrations

- [ ] Third-party APIs validated
- [ ] API responses validated/sanitized
- [ ] Third-party libraries reviewed for vulnerabilities
- [ ] Integration documentation covers security
- [ ] Error handling for failed integrations

## Severity Levels

| Severity | Definition | Action |
|----------|-----------|--------|
| **Critical** | Can lead to code execution, data breach, or system compromise | BLOCK release immediately |
| **High** | Significant security vulnerability, requires immediate fix | Block release, escalate to Security Lead |
| **Medium** | Moderate risk, should be fixed before release or documented | Manual review required, can approve with justification |
| **Low** | Minor security consideration, can be addressed in future release | Log as item for backlog, auto-approve |

## Approval Workflow

### Automatic Approval Criteria

Release is auto-approved at Security Review stage if:

- [ ] SAST scan: 0 critical, 0 high, < 5 medium findings
- [ ] Dependency audit: No vulnerabilities or all acceptable
- [ ] Security headers: All required headers present
- [ ] No patterns matching OWASP Top 10

### Manual Review Triggers

Security Lead manual review required if:

- [ ] Any critical findings present
- [ ] High-severity findings require mitigation strategy
- [ ] Medium findings > 5 or clustered by issue type
- [ ] Dependency vulnerabilities require documentation
- [ ] Custom implementation of security features

### Escalation Path

If Security Lead cannot approve:

1. Escalate to Security Director or CISO
2. For critical vulnerabilities: block release
3. For high vulnerabilities: require fix or comprehensive mitigation plan
4. For emergency override: requires executive approval + post-release audit

## Evidence Documentation

Attach these items to approval:

- [ ] SAST scan report (JSON or XML export)
- [ ] Dependency audit log output
- [ ] Security headers validation checklist
- [ ] Code review notes (if manual review)
- [ ] Risk assessment and mitigations
- [ ] Any exceptions documented with justification
- [ ] Links to closed security issues/PRs

## Post-Release Security

- [ ] Security findings logged for backlog
- [ ] Medium findings scheduled for next minor release
- [ ] Documentation updated with known issues
- [ ] Security monitoring enabled
- [ ] Incident response plan reviewed
- [ ] Rollback procedure documented
