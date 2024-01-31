import axios from "axios";
import express, { Request, Response } from "express";
import { SearchResults } from "./data";

let BASEURL = "https://api.mercadolibre.com"

const getProducts = async (req: Request, res: Response) => {
  const { q, limit = 4 } = req.query;
  const url = `${BASEURL}/sites/MLA/search?q=${q}&limit=${limit}`;
  try {
    const { data } = await axios.get<SearchResults>(url);
    const items = data.results.map(
      ({
        id,
        title,
        price,
        currency_id,
        thumbnail,
        condition,
        shipping: { free_shipping },
        seller_address: {
          city: { name },
        },
      }) => ({
        id,
        title,
        price: {
          currency: currency_id,
          amount: price,
        },
        picture: thumbnail,
        condition,
        free_shipping,
        city: name,
      })
    );

    res.json({ items });
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      res.status(404).send("El personaje no existe");
    } else {
      res.status(500).send("Ocurrió un error al consultar la API");
    }
  }
};

export default getProducts;