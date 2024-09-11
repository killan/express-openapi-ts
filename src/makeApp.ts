import SwaggerParser from "@apidevtools/swagger-parser";
import SwaggerRoutes from "swagger-routes-express"
import express from "express";
import cors from "cors"
import swaggerUi from "swagger-ui-express"

export class MakeApp {
    static async make() {
        const parser = new SwaggerParser()
        const apiDescription = await parser.validate('./api/openapi.yaml')
        const connect = SwaggerRoutes.connector({
            getCore: async (req, res, next) => {
                console.log("getCore")
                res.json([])
            }
        }, apiDescription, {
            onCreateRoute: (method, descriptor) => {
                const [path, ...handlers] = descriptor
                console.log('created route', method, path, handlers)
            }
        })
        const app = express()

        // Options
        app.set("etag", false); // turn off
        app.use(
            express.urlencoded({
                extended: true,
            })
        );

        app.use(express.json());

        app.use(cors({
            origin: '*'
        }))

        // This is the endpoint that will display the swagger docs
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDescription));

        // Connect the routes
        connect(app)

        // Add any error handlers last

        return app
    }
}