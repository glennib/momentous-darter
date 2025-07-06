# Overview

Read the project's README.md and DESIGN.md.
Read packages.json to learn about scripts and dependencies.

# Running commands

Run commands with `nix-shell --run "<command>"`.

# Lints

Before considering a task complete, run lints, formatting and tests.

Warnings and errors should be corrected.
Not by ignoring them.
If you believe there is a false positive, either prompt a maintainer or explain why a lint is ignored.

# Local environment

We prioritize having a working local environment as far as we can.
That means running a local database instance, and other services as well.

# Adding dependencies

Prefer using `pnpm add` to editing packages.json for adding dependencies.
This ensures latest versions.
