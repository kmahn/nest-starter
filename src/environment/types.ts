export type Environment = {
  version: `${number}.${number}.${number}`;
  cors: {
    origin: string[];
    methods: string[];
  };
};
