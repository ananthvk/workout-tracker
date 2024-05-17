import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url'
import fastifyPlugin from 'fastify-plugin';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export type AppOptions = {
    // Place your custom options for app below here.
    logger: any
} & Partial<AutoloadPluginOptions>;


// Pass --options via CLI arguments in command to enable these options.
const options: any = {
    logger: {
        transport: {
            target: "@fastify/one-line-logger",
        },
    },
    // Do not coerce types, i.e. when validating do not try to automatically convert to the required type
    // For example, when coerceTypes is enabled, a number is accepted even when the type is set to string
    ajv: {
        customOptions: {
            coerceTypes: false,
        }
    }
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
    // Place here your custom code!

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: opts,
        forceESM: true
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: opts,
        forceESM: true
    })

};

// Wrap the app in fastify-plugin so that the tests can find the decorators, and other plugins
export default fastifyPlugin(app);
export { app, options }
