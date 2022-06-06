import { DataSource } from 'typeorm';
import { IncidentEntity } from './entities/incident.entity';
import { UserEntity } from './entities/user.entity';

export async function getDatabaseConnection(): Promise<DataSource> {
  const mongoDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.TYPEORM_URL,
    useNewUrlParser: true,
    logger: 'advanced-console',
    logging: true,
    synchronize: true,
    entities: [
      UserEntity,
      IncidentEntity,
    ],
    useUnifiedTopology: true,
  });

  await mongoDataSource.initialize();

  return mongoDataSource;
}
