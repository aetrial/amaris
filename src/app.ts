import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./services/amaris.service";
import { MONGO_URL } from "./constants/amaris.constants";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setControllers() {
    // Creating a new instance of our Pokemon Controller
    const pokemonController = new PokemonController(new PokemonService());

    // Telling express to use our Controller's routes
    this.app.use("/pokemon", pokemonController.router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (_: any, converted: any) => {
          delete converted._id;
        },
      });
  }

}

export default new App().app;