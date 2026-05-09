"""Public lead capture — landing page Talk-To-Team / Become-Partner forms.

Stores submissions from the public landing page so the partnership / sales
team can review and follow up. Anonymous (no FK to users); rate-limited at
the route level. Status flips new -> contacted -> converted | dismissed
as the team works the lead.

Revision ID: 0018
Revises: 0017
"""
from alembic import op


revision = "0018"
down_revision = "0017"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            kind            VARCHAR(20)  NOT NULL,
            full_name       VARCHAR(120) NOT NULL,
            email           VARCHAR(255) NOT NULL,
            phone           VARCHAR(40),
            company         VARCHAR(120),
            website         VARCHAR(255),
            partner_type    VARCHAR(40),
            message         TEXT,
            source          VARCHAR(60),
            user_agent      VARCHAR(255),
            ip_address      INET,
            status          VARCHAR(20)  NOT NULL DEFAULT 'new',
            created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
        );
    """)
    op.execute("CREATE INDEX IF NOT EXISTS ix_leads_kind       ON leads (kind);")
    op.execute("CREATE INDEX IF NOT EXISTS ix_leads_email      ON leads (email);")
    op.execute("CREATE INDEX IF NOT EXISTS ix_leads_status     ON leads (status);")
    op.execute("CREATE INDEX IF NOT EXISTS ix_leads_created_at ON leads (created_at);")


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS leads;")
