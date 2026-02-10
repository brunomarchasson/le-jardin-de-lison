import * as migration_20260207_155455_initial_schema from './20260207_155455_initial_schema';
import * as migration_20260210_104011_add_ai_providers_keys from './20260210_104011_add_ai_providers_keys';

export const migrations = [
  {
    up: migration_20260207_155455_initial_schema.up,
    down: migration_20260207_155455_initial_schema.down,
    name: '20260207_155455_initial_schema',
  },
  {
    up: migration_20260210_104011_add_ai_providers_keys.up,
    down: migration_20260210_104011_add_ai_providers_keys.down,
    name: '20260210_104011_add_ai_providers_keys'
  },
];
