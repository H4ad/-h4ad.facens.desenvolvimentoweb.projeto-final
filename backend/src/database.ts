import { DataSource } from 'typeorm';
import { IncidentEntity } from './entities/incident.entity';
import { UserEntity } from './entities/user.entity';

export async function getDatabaseConnection(): Promise<DataSource> {
  const mongoDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
