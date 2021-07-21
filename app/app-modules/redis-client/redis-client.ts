/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import * as redis              from "redis";
import * as expressSession     from "express-session";

let RedisConnector = require("connect-redis")(expressSession);

export class RedisClient {
	constructor() {}

	/**
	 * Init Redis Client
	 */
	initRedis() {
		let redisClient     = redis.createClient();
		let redisConnection = {
			host:   'localhost',
			port:   6379,
			client: redisClient,
			ttl:    260
		};
		let redisStore      = new RedisConnector(redisConnection);
	}
}
