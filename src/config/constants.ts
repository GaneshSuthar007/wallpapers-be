import { Wallpapers } from '../entities/wallpapers.entity';
import { Categories } from '../entities/categories.entity';
import { Apps } from '../entities/apps.entity';
import { Tokens } from 'src/entities/tokens.entity';
export const ModuleConfigs = {
  app: {
    entities: [Wallpapers, Categories, Apps, Tokens],
  },
};
