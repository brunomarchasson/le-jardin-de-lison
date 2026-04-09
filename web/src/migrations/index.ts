import * as migration_20260207_155455_initial_schema from './20260207_155455_initial_schema';
import * as migration_20260210_173527_add_media_sizes from './20260210_173527_add_media_sizes';
import * as migration_20260210_180113_add_ai_settings_fields from './20260210_180113_add_ai_settings_fields';
import * as migration_20260331_102008_move_glanage_to_page_content from './20260331_102008_move_glanage_to_page_content';
import * as migration_20260331_115431_nest_page_content_fields from './20260331_115431_nest_page_content_fields';
import * as migration_20260403_145739_add_contact_fields_and_socials from './20260403_145739_add_contact_fields_and_socials';
import * as migration_20260407_063022_add_contact_and_cecile_fields from './20260407_063022_add_contact_and_cecile_fields';
import * as migration_20260408_075012_add_catalogue_titles from './20260408_075012_add_catalogue_titles';
import * as migration_20260409_112057 from './20260409_112057';

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
    name: '20260331_115431_nest_page_content_fields',
  },
  {
    up: migration_20260403_145739_add_contact_fields_and_socials.up,
    down: migration_20260403_145739_add_contact_fields_and_socials.down,
    name: '20260403_145739_add_contact_fields_and_socials',
  },
  {
    up: migration_20260407_063022_add_contact_and_cecile_fields.up,
    down: migration_20260407_063022_add_contact_and_cecile_fields.down,
    name: '20260407_063022_add_contact_and_cecile_fields',
  },
  {
    up: migration_20260408_075012_add_catalogue_titles.up,
    down: migration_20260408_075012_add_catalogue_titles.down,
    name: '20260408_075012_add_catalogue_titles',
  },
  {
    up: migration_20260409_112057.up,
    down: migration_20260409_112057.down,
    name: '20260409_112057'
  },
];
