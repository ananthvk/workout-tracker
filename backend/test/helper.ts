// This file contains code that we reuse between our tests.
import helper from "fastify-cli/helper.js";
import tap from "tap";
import * as path from "path";
import { fileURLToPath } from "url";

export type TestContext = {
    after: typeof tap.after;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AppPath = path.join(__dirname, "..", "src", "app.ts");

// Fill in this config with all the configurations
// needed for testing the application
async function config_(dbname: string) {
    process.env.JWT_KEY = "test";
    process.env.DBNAME = dbname;
    process.env.CONNECTION_STRING =
        "postgresql://postgres:dev@127.0.0.1:5432/postgres";
    process.env.DB_CONNECTION_STRING = `postgresql://postgres:dev@127.0.0.1:5432/${dbname}`;
    return {};
}

async function config() {
    return config_("test");
}

// Automatically build and tear down our instance
// Note: dbname must be lowercase only
async function build(t: TestContext, dbname: string) {
    // you can set all the options supported by the fastify CLI command

    // pass the -o flag so that options such as disabling ajv coercing are enabled
    const argv = [AppPath, "-o"];

    // fastify-plugin ensures that all decorators
    // are exposed for testing purposes, this is
    // different from the production setup
    const app = await helper.build(argv, await config_(dbname));

    // Tear down our app after we are done
    t.after(async () => {
        await app.pg.query("DROP TABLE IF EXISTS exercise_exercisetype_rel;");
        await app.pg.query("DROP TABLE IF EXISTS exercise_muscletype_rel;");
        await app.pg.query("DROP TABLE IF EXISTS exerciseset;");
        await app.pg.query("DROP TABLE IF EXISTS exercisetype;");
        await app.pg.query("DROP TABLE IF EXISTS muscletype;");
        await app.pg.query("DROP TABLE IF EXISTS exercise;");
        await app.pg.query("DROP TABLE IF EXISTS workoutsession;");
        await app.pg.query("DROP TABLE IF EXISTS usr;");
        app.close();
    });

    return app;
}

export { config, build };
