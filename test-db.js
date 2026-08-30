import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'jeca1364',
  database: process.env.DB_NAME || 'ProVendor2026',
});

async function probarConexion() {
  try {
    const cliente = await pool.connect();
    console.log(' Conexión exitosa a la base de datos PostgreSQL: ProVendor2026');
    
    const resultado = await cliente.query('SELECT NOW() as fecha_actual, current_database() as db_actual;');
    console.log(' Base de datos activa:', resultado.rows[0].db_actual);
    console.log(' Hora del servidor PostgreSQL:', resultado.rows[0].fecha_actual);
    
    cliente.release();
    await pool.end();
  } catch (error) {
    console.error(' Error de conexión a PostgreSQL:', error.message);
  }
}

probarConexion();