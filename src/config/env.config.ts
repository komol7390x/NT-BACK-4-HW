import dotenv from 'dotenv';
dotenv.config();

type ConfigType = {
  API_PORT: number;
  DB_URL: string;
  DB_SYNC: boolean;
};

export const config: ConfigType = {
  API_PORT: Number(process.env.PORT),
  DB_URL: String(process.env.NODE_ENV === 'dev')
    ? String(process.env.DEV_DB_URL)
    : String(process.env.PROD_DB_URL),
  DB_SYNC: String(process.env.NODE_ENV == 'dev') ? true : false,
};
