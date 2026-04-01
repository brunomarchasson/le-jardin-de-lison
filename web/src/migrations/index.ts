import * as migration_20260207_155455_initial_schema from './20260207_155455_initial_schema';
import * as migration_20260210_173527_add_media_sizes from './20260210_173527_add_media_sizes';
import * as migration_20260210_180113_add_ai_settings_fields from './20260210_180113_add_ai_settings_fields';
import * as migration_20260331_102008_move_glanage_to_page_content from './20260331_102008_move_glanage_to_page_content';
import * as migration_20260331_115431_nest_page_content_fields from './20260331_115431_nest_page_content_fields';

export const migrations = [
  {
    up: migration_20260207_155455_initial_schema.up,
    down: migration_20260207_155455_initial_schema.down,
    name: '20260207_155455_initial_schema',
  },
  {
    up: migration_20260210_173527_add_media_sizes.up,
    down: migration_20260210_173527_add_media_sizes.down,
    name: '20260210_173527_add_media_sizes',
  },
  {
    up: migration_20260210_180113_add_ai_settings_fields.up,
    down: migration_20260210_180113_add_ai_settings_fields.down,
    name: '20260210_180113_add_ai_settings_fields',
  },
  {
    up: migration_20260331_102008_move_glanage_to_page_content.up,
    down: migration_20260331_102008_move_glanage_to_page_content.down,
    name: '20260331_102008_move_glanage_to_page_content',
  },
  {
    up: migration_20260331_115431_nest_page_content_fields.up,
    down: migration_20260331_115431_nest_page_content_fields.down,
    name: '20260331_115431_nest_page_content_fields'
  },
];
