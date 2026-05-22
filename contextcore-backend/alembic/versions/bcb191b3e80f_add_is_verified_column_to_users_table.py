"""legacy placeholder revision

This revision existed in older dev databases. It is kept as a no-op so Alembic
can locate the revision if a database's `alembic_version` still points to it.

Revision ID: bcb191b3e80f
Revises:
Create Date: 2026-05-08

"""

from typing import Sequence, Union


# revision identifiers, used by Alembic.
revision: str = "bcb191b3e80f"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass

