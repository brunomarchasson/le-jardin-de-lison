import * as migration_20260207_155455_initial_schema from './20260207_155455_initial_schema';
import * as migration_20260210_173527_add_media_sizes from './20260210_173527_add_media_sizes';

export const migrations = [
  {
    up: migration_20260207_155455_initial_schema.up,
    down: migration_20260207_155455_initial_schema.down,
    name: '20260207_155455_initial_schema',
  },
  {
    up: migration_20260210_173527_add_media_sizes.up,
    down: migration_20260210_173527_add_media_sizes.down,
    name: '20260210_173527_add_media_sizes'
  },
];
