db.createUser(
  {
    user: 'root',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'hero',
      },
    ],
  },
);

db.createCollection('hero');
