'use strict';

// Requires
const Promise = require('bluebird');
const EventEmitter = require('events');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});

module.exports = class PgSession extends EventEmitter {
  /**
   * Creates a new PgSession model for use with koa-session-generic
   * @param connection The connection string or object to be passed directly into the pg module
   * @param options A hash consisting of all optional keys
     {schema="public", table="session", create=true, cleanupTime = 45 minutes}
   * @constructor
   */
  constructor(connection, options) {
    super();

    // If they want to use an existing client they must pass in a function to process each query.
    // Their function must return a promise.
    if (typeof connection === 'function') {
      this.query = connection;
    } else {
      // If they don't want to use an existing client,
      // make our own connection to the database and use that for queries
      this.db = pgp(connection);
      this.query = (query, params) => this.db.query(query, params);
    }

    //By default say that we're not ready to create sessions
    this.ready = false;

    //And store the session options
    this.options = Object.assign({}, PgSession.defaultOpts, options);
  }

  static get defaultOpts() {
    return {
      schema: 'public',
      table: 'session',
      create: true, //Create a new session table by default
      cleanupTime: 45 * 60 * 1000, // 45 minutes
    };
  }

  /**
   * Starts the cleanup, and creates the session table if necessary
   * @returns {*} A promise that resolves when the setup has completed
   */
  setup() {
    //Only setup if we're not ready
    if (this.ready) {
      return;
    }

    //If we need to create the tables, return a promise that resolves once the query completes
    //Otherwise just setup the cleanup and return an empty promise
    let promise = this.options.create ? this.query(this.createSql) : Promise.resolve();

    //Once we've finished creation, schedule cleanup and tell everyone we're ready
    return promise.then(() => {
      this.scheduleCleanup();
      this.ready = true;
      this.emit('connect');
    });
  }

  /**
   * Gets a session object with the given sid
   * @param sid The Koa session ID
   * @returns The session object if it exists, otherwise false
   */

  * get(sid) {
    if (!this.ready) {
      throw new Error(`Error trying to access koa postgres session: session setup has not been run.
      See https://github.com/TMiguelT/koa-pg-session#the-setup-function for details.`);
    }

    //Get the existing session row
    const existing = (yield this.query(this.getValueSql, [sid]));

    //If there is no such row, return false
    if (existing.length <= 0) {
      return false;
    }
    // Otherwise return the row
    return existing[0].session;
  }

  /**
   * Creates a new session or updates an existing one
   * @param sid The Koa session ID to set
   * @param sess The session date to insert into the session table
   * @param ttl The time to live, i.e. the time until the session expires. Defaults to 45 minutes
   */

  * set(sid, sess, ttl) {
    if (!this.ready) {
      throw new Error(`Error trying to modify koa postgres session: session setup has not been run.
      See https://github.com/TMiguelT/koa-pg-session#the-setup-function for details.`);
    }

    ttl = ttl || 45 * 60 * 1000; // 45 minutes
    const expiry = (Date.now() + ttl) / 1000;

    //If there is a row, update it
    if (yield* this.get(sid)) {
      yield this.query(this.updateValueSql, [sess, expiry, sid]);
    } else {
      // Otherwise, insert a new row
      // (These two queries intentionally have a different parameter order
      // because of the SQL structure)
      yield this.query(this.insertValueSql, [sid, sess, expiry]);
    }
  }

  /**
   * Destroy the session with the given sid
   * @param sid The Koa session ID of the session to destroy
   */
  * destroy(sid) {
    yield this.query(this.destroyValueSql, [sid]);
  }

  // Setup cleanup of all sessions in the session table that have expired
  scheduleCleanup() {
    let sess = this;

    //Each interval of cleanupTime, run the cleanup script
    setTimeout(function interval() {
      sess.query(sess.cleanupSql, Date.now() / 1000).then(() => {
        //Recurse so that the cleanupTime can be dynamic
        setTimeout(interval, sess.options.cleanupTime);
      });
    }, sess.options.cleanupTime);
  }

  // Get the raw SQL for creating a new session table
  get createSql() {
    return `
      CREATE SCHEMA IF NOT EXISTS ${this.options.schema};
      CREATE TABLE IF NOT EXISTS ${this.options.schema}.${this.options.table} (
        id TEXT NOT NULL PRIMARY KEY,    -- This is the Koa session ID
        expiry timestamp NOT NULL,       -- This is the timestamp of when it will expire
        session JSON                     -- All the session data that has been saved
      );
    `;
  }

  // Get the raw SQL for getting an existing session
  get getValueSql() {
    return `
      SELECT session FROM ${this.options.schema}.${this.options.table}
      WHERE id = $1;
    `;
  }

  // Get the raw SQL for updating an existing session
  get updateValueSql() {
    return `
      UPDATE ${this.options.schema}.${this.options.table} SET session = $1, expiry = to_timestamp($2)
      WHERE id = $3;
    `;
  }

  // Get the raw SQL for creating a new existing session
  get insertValueSql() {
    return `
      INSERT INTO ${this.options.schema}.${this.options.table}(id, session, expiry)
      VALUES($1, $2, to_timestamp($3));
    `;
  }

  // Get the raw SQL for destroying an existing session
  get destroyValueSql() {
    return `
      DELETE FROM ${this.options.schema}.${this.options.table}
      WHERE id = $1;
    `;
  }

  // Get the raw SQL for cleaning up expired sessions
  get cleanupSql() {
    return `
      DELETE FROM ${this.options.schema}.${this.options.table}
      WHERE expiry <= to_timestamp($1);
    `;
  }
};
