export const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'string',
    title: 'string',
    description: 'string',
    image: 'string',
    create: 'string',
  },
  primaryKey: '_id',
};
