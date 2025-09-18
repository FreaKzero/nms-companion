import Localbase from 'localbase';

const DATABASE = new Localbase('no-mans-sky-log');
DATABASE.config.debug = false;

const getDB = () => DATABASE;

export default getDB;
