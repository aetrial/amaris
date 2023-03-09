import { Request, Response, Router } from "express";
import { FINDALL_ERROR, CREATE_ERROR, DELETE_ERROR, UPDATE_ERROR, CREATE_EXTERNAL_ERROR } from "./constants/amaris.constants"
import { PokemonService } from "./services/amaris.service";

export class PokemonController {
  public router = Router();

  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.sayHello).post(this.add);

    this.router.route("/all").get(this.findAll);

    this.router.route("/pokedex/:id").get(this.addExternal);

    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.pokemonService.getWelcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.pokemonService.findAll();
      res.send(pokemon);
    } catch (e) {
      res.status(500).send(FINDALL_ERROR + e);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.pokemonService.add(req.body);
      res.send(addPokemonResult);
    } catch (e) {
      res.status(500).send(CREATE_ERROR + e);
    }
  };

  private addExternal = async (req: Request, res: Response) => {
    try {
      const addExternalPokemonResult = await this.pokemonService.addExternal(req.params.id);
      res.send(addExternalPokemonResult);
    } catch (e) {
      res.status(404).send(CREATE_EXTERNAL_ERROR + e);
    }
  };
  

  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.pokemonService.delete(
        req.params.id
      );
      res.send(deletePokemonResult);
    } catch (e) {
      res.status(404).send(DELETE_ERROR + e);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.pokemonService.update(
        req.params.id,
        req.body
      );
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(404).send(UPDATE_ERROR + e);
    }
  };

}