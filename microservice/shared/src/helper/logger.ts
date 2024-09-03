import winston, { createLogger, Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

export const logger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  const transportOptions = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticsearchNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false,
      },
    },
  };

  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    transportOptions.elasticsearch
  );

  return createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: [new winston.transports.Console(transportOptions.console), esTransport],
  });
};
