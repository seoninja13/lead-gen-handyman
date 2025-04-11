/**
 * SQL Operation Logging Utility
 * Provides comprehensive logging for SQL operations including error tracking,
 * query execution monitoring, and performance metrics.
 */

const fs = require('fs');
const path = require('path');

// Constants for log levels
const LOG_LEVELS = {
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};

// Constants for operation types
const OPERATION_TYPES = {
    SELECT: 'SELECT',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    CREATE: 'CREATE',
    OTHER: 'OTHER'
};

class SQLLogger {
    constructor() {
        this.logDir = path.join(process.cwd(), 'logs');
        this.logFile = path.join(this.logDir, 'sql-operations.log');
        this.ensureLogDirectory();
    }

    /**
     * Ensures the log directory exists
     */
    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Formats a log message with timestamp and metadata
     */
    formatLogMessage(level, operation, message, metadata = {}) {
        const timestamp = new Date().toISOString();
        return JSON.stringify({
            timestamp,
            level,
            operation,
            message,
            ...metadata
        }) + '\n';
    }

    /**
     * Writes a log entry to the log file
     */
    async writeLog(level, operation, message, metadata = {}) {
        const logEntry = this.formatLogMessage(level, operation, message, metadata);
        try {
            await fs.promises.appendFile(this.logFile, logEntry);
        } catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }

    /**
     * Logs the start of a SQL operation
     */
    async logOperationStart(operation, query, params = {}) {
        await this.writeLog(LOG_LEVELS.INFO, operation, 'Operation started', {
            query,
            params,
            startTime: Date.now()
        });
    }

    /**
     * Logs the successful completion of a SQL operation
     */
    async logOperationSuccess(operation, query, duration, result = null) {
        await this.writeLog(LOG_LEVELS.INFO, operation, 'Operation completed successfully', {
            query,
            duration,
            result: result ? JSON.stringify(result) : undefined
        });
    }

    /**
     * Logs an error that occurred during a SQL operation
     */
    async logOperationError(operation, query, error, metadata = {}) {
        await this.writeLog(LOG_LEVELS.ERROR, operation, 'Operation failed', {
            query,
            error: {
                message: error.message,
                stack: error.stack,
                code: error.code
            },
            ...metadata
        });
    }

    /**
     * Logs performance metrics for a SQL operation
     */
    async logPerformanceMetrics(operation, query, metrics) {
        await this.writeLog(LOG_LEVELS.DEBUG, operation, 'Performance metrics', {
            query,
            metrics
        });
    }

    /**
     * Retrieves recent log entries
     */
    async getRecentLogs(count = 10) {
        try {
            const logs = await fs.promises.readFile(this.logFile, 'utf8');
            return logs
                .split('\n')
                .filter(Boolean)
                .map(line => JSON.parse(line))
                .slice(-count);
        } catch (error) {
            console.error('Failed to read logs:', error);
            return [];
        }
    }
}

// Create and export a singleton instance
const sqlLogger = new SQLLogger();

module.exports = {
    sqlLogger,
    LOG_LEVELS,
    OPERATION_TYPES
};