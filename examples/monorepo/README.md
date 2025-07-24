# Monorepo Project Example

This example demonstrates how to use Handoff AI in a large-scale monorepo with multiple services, shared libraries, and different technology stacks.

## Project Structure

```
monorepo/
├── .project/                    # Root Handoff AI configuration
│   ├── handoff-config.md       # Monorepo-wide collaboration settings
│   ├── assumptions.md          # Cross-service architectural decisions
│   ├── ai-quick-start.md       # Monorepo context for AI assistants
│   └── epics/                  # Monorepo development workflows
├── services/
│   ├── api-gateway/            # Node.js API Gateway
│   │   └── .project/           # Service-specific Handoff config
│   ├── user-service/           # Python microservice
│   │   └── .project/           # Service-specific Handoff config
│   ├── notification-service/   # Go microservice
│   │   └── .project/           # Service-specific Handoff config
│   └── analytics-service/      # Scala/Spark service
│       └── .project/           # Service-specific Handoff config
├── packages/                   # Shared libraries
│   ├── shared-types/           # TypeScript type definitions
│   ├── common-utils/           # Cross-language utilities
│   └── ui-components/          # React component library
├── infrastructure/             # Infrastructure as Code
│   ├── terraform/              # Terraform configurations
│   ├── kubernetes/             # K8s manifests
│   └── docker/                 # Docker configurations
├── tools/                      # Development tools
│   ├── build-scripts/          # Build automation
│   ├── testing/                # Cross-service testing
│   └── deployment/             # Deployment scripts
└── docs/                       # Monorepo documentation
    ├── architecture/           # System architecture docs
    ├── apis/                   # API documentation
    └── runbooks/               # Operational guides
```

## Hierarchical Handoff Configuration

### Root Configuration
```markdown
# .project/handoff-config.md (root)

## Monorepo Context
- **Architecture:** Microservices with event-driven communication
- **Technologies:** Node.js, Python, Go, Scala, React, PostgreSQL, Redis, Kafka
- **Infrastructure:** Kubernetes on AWS with Terraform
- **Communication:** REST APIs + Event streaming (Kafka)
- **Shared Standards:** OpenAPI specs, shared type definitions

## Collaboration Preferences
- **Mode:** collaborate (for cross-service decisions)
- **Engagement:** medium-engagement
- **Expertise:** expert (senior team)
- **Trust Level:** high (experienced with monorepos)

## Cross-Service Standards
- **API Design:** RESTful with OpenAPI 3.0 specs
- **Error Handling:** Consistent error codes across services
- **Logging:** Structured JSON logging with correlation IDs
- **Testing:** Contract testing with Pact
- **Documentation:** Service-specific docs + cross-service integration guides
```

### Service-Specific Configuration
```markdown
# services/user-service/.project/handoff-config.md

## Service Context
- **Domain:** User Management and Authentication
- **Technology:** Python FastAPI with PostgreSQL
- **Dependencies:** api-gateway, notification-service
- **Shared Libraries:** shared-types, common-utils
- **Parent Config:** ../../.project/ (inherits monorepo standards)

## Service-Specific Patterns
- **Authentication:** JWT with service-to-service tokens
- **Database:** SQLAlchemy with Alembic migrations
- **Testing:** pytest with testcontainers
- **API Contracts:** OpenAPI spec in shared-types package
```

## Cross-Service Assumptions

### Root Assumptions
```markdown
# .project/assumptions.md (root)

## Architectural Decisions

### Service Communication Pattern
- **Decision:** Async event-driven for non-critical operations, sync REST for critical paths
- **Rationale:** Balance between consistency and performance
- **AI Assumption:** Use Kafka events for user updates, REST for authentication

### Data Consistency Strategy
- **Decision:** Eventual consistency with compensation patterns
- **Rationale:** Microservices independence vs strong consistency trade-off
- **AI Assumption:** Each service owns its data, cross-service queries via APIs

### Shared Library Strategy
- **Decision:** Minimal shared code, prefer duplication over coupling
- **Rationale:** Service independence and deployment flexibility
- **AI Assumption:** Only share types and truly common utilities

### API Versioning Approach
- **Decision:** URL versioning (/v1/, /v2/) with backward compatibility
- **Rationale:** Clear versioning with gradual migration support
- **AI Assumption:** Maintain previous version for 6 months minimum
```

### Service-Specific Assumptions
```markdown
# services/user-service/.project/assumptions.md

## User Service Decisions

### Authentication Token Strategy
- **Decision:** Short-lived JWT (15 min) with refresh tokens
- **Rationale:** Security vs UX balance, inherited from root assumptions
- **AI Assumption:** Service-to-service uses longer-lived tokens (4 hours)

### User Data Privacy
- **Decision:** PII encryption at rest, audit logging for access
- **Rationale:** GDPR compliance and security requirements
- **AI Assumption:** All user queries logged with correlation IDs

### Password Policy
- **Decision:** bcrypt with cost factor 12, password history of 5
- **Rationale:** Security best practices with performance consideration
- **AI Assumption:** Password validation follows OWASP guidelines
```

## AI Collaboration Examples

### Cross-Service Feature Development
```
"Please help me implement user profile synchronization across services using the Feature Implementation EPIC. Consider:

1. Root monorepo context from .project/
2. User service patterns from services/user-service/.project/
3. Event-driven communication assumptions
4. Shared type definitions in packages/shared-types/
5. API versioning strategy

Use collaborate mode for cross-service decisions."
```

### Service Integration
```
"Using the Collaborative Documentation EPIC, help me document the integration between user-service and notification-service. Follow our:
- Cross-service communication patterns
- Event schema definitions
- Error handling standards
- Contract testing approach

Reference both service-specific and root Handoff configurations."
```

### Infrastructure Changes
```
"Help me update the Kubernetes deployment for the user-service following our documented infrastructure patterns. Consider:
- Monorepo deployment strategies from .project/assumptions.md
- Service-specific requirements from services/user-service/.project/
- Shared infrastructure patterns
- Rolling deployment approach"
```

## Workflow Examples

### 1. Adding New Service

**AI Request:**
```
Help me scaffold a new payment-service following our monorepo patterns:

1. Check root .project/ for monorepo standards
2. Follow our service structure conventions
3. Set up service-specific Handoff configuration
4. Implement standard health checks and logging
5. Add to shared infrastructure configurations
6. Create service-specific documentation

Use the established patterns from existing services.
```

**Expected AI Response:**
```
Based on your monorepo .project/ configuration, I see you're using:
- Microservices with event-driven communication
- Service-specific Handoff configs inheriting from root
- Consistent API design with OpenAPI specs
- Shared infrastructure patterns

Here's the new payment-service following your patterns:

[Service scaffolding with proper structure, configuration, and integration]
```

### 2. Cross-Service Refactoring

**AI Request:**
```
Using the Codebase Improvement EPIC, help me refactor user authentication to be consistent across all services. Consider:
- Root authentication assumptions
- Service-specific implementations
- Shared library opportunities
- Migration strategy for existing services
```

### 3. Shared Library Development

**AI Request:**
```
Help me create a new shared utility library following our documented shared library strategy. Ensure:
- Minimal coupling as documented in root assumptions
- Proper versioning and publishing
- Usage examples for each service
- Integration with existing build processes
```

## Benefits Demonstrated

### Consistent Architecture
- Shared standards across all services
- Consistent patterns for new service development
- Unified approach to cross-service communication

### Efficient Development
- AI understands both monorepo and service-specific context
- No need to re-explain architectural decisions
- Consistent code generation across different technologies

### Better Coordination
- Cross-service changes follow documented patterns
- Shared assumptions prevent conflicting implementations
- Clear inheritance from root to service-specific configurations

### Scalable Knowledge Management
- New services automatically inherit monorepo standards
- Service-specific customizations without losing consistency
- Clear documentation hierarchy

## Advanced Monorepo Patterns

### Configuration Inheritance
```markdown
# Service inherits from root but can override
# services/analytics-service/.project/handoff-config.md

## Inherited from Root
- Cross-service communication patterns
- Logging and monitoring standards
- API design principles

## Service-Specific Overrides
- **Technology:** Scala/Spark (different from root Node.js focus)
- **Engagement:** auto-pilot (analytics team preference)
- **Data Processing:** Batch processing patterns vs real-time
```

### Shared Context References
```markdown
# Reference shared context across services
# services/user-service/.project/ai-quick-start.md

## Service Context
This is the User Management service in our microservices architecture.

## Related Services
- **API Gateway:** ../api-gateway/.project/ (routing and auth)
- **Notifications:** ../notification-service/.project/ (user events)
- **Analytics:** ../analytics-service/.project/ (user behavior data)

## Shared Resources
- **Types:** ../../packages/shared-types/ (API contracts)
- **Utils:** ../../packages/common-utils/ (shared utilities)
- **Infrastructure:** ../../infrastructure/ (deployment configs)

## Monorepo Standards
See root .project/ for cross-service standards and architectural decisions.
```

### Cross-Service Testing
```python
# AI understands monorepo testing patterns
# tests/integration/test_user_notification_flow.py

"""
Cross-service integration test following monorepo testing patterns.
Tests user registration → notification sending flow.

References:
- Root testing assumptions: ../../.project/assumptions.md
- User service patterns: ../services/user-service/.project/
- Notification patterns: ../services/notification-service/.project/
"""

import pytest
from testcontainers import DockerCompose

# Follow documented container testing approach
@pytest.fixture(scope="module")
def services():
    """Start user-service and notification-service for integration testing."""
    with DockerCompose("../../", compose_file_name="docker-compose.test.yml") as compose:
        yield compose

def test_user_registration_notification_flow(services):
    """Test complete user registration with notification delivery."""
    # Follow documented API patterns from shared-types
    # Use documented error handling patterns
    # Verify event-driven communication assumptions
```

### Infrastructure as Code Integration
```hcl
# AI follows documented infrastructure patterns
# infrastructure/terraform/services/user-service.tf

# Reference root infrastructure assumptions
# Follow documented naming conventions
# Use shared modules and standards

module "user_service" {
  source = "../modules/microservice"
  
  # Follow documented service configuration pattern
  service_name = "user-service"
  
  # Use documented resource sizing
  cpu_request = "100m"  # From root assumptions
  memory_request = "256Mi"
  
  # Follow documented networking patterns
  internal_port = 8080
  health_check_path = "/health"  # Documented standard
  
  # Reference service-specific configuration
  environment_variables = {
    DATABASE_URL = var.user_service_db_url
    JWT_SECRET = var.jwt_secret
    # Follow documented environment variable naming
  }
}
```

## Key Learnings

1. **Hierarchical Configuration:** Root configuration provides monorepo standards, service-specific configs add customization

2. **Context Inheritance:** Services inherit architectural decisions while maintaining domain-specific flexibility

3. **Cross-Service Coordination:** Shared assumptions prevent conflicting implementations across teams

4. **Scalable Documentation:** Clear hierarchy from monorepo → service → component level documentation

5. **Technology Diversity:** Handoff AI works across different tech stacks within the same monorepo

## Next Steps

To implement this pattern in your monorepo:

1. **Initialize Root:** `npx handoff-ai init --template team` in monorepo root
2. **Document Architecture:** Add cross-service patterns to root `.project/assumptions.md`
3. **Service Setup:** Initialize Handoff in each service with service-specific context
4. **Establish Inheritance:** Reference root configuration from service configs
5. **Cross-Service Standards:** Document shared patterns and communication protocols
6. **Team Training:** Ensure all teams understand the hierarchical configuration approach

This example shows how Handoff AI scales from individual services to complex monorepos, maintaining consistency while allowing service-specific customization.