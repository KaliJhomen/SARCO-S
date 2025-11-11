import * as fs from 'fs';
import * as path from 'path';

export function writeLog(message: string) {
  try {
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, 'errors.log');

    console.error('🧭 Intentando escribir log en:', logFile);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
      console.error('📁 Carpeta logs creada');
    }

    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage, 'utf8');
    console.error('✅ Log escrito correctamente');
  } catch (error) {
    console.error('❌ Error al escribir log:', error);
  }
}
