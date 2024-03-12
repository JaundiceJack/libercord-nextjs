import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddRemoveProps, EditProps } from "./types";

// Alpha Vantage API Key: CFR44C5JJ8BET683
const apiKey = "CFR44C5JJ8BET683";

const tickersRequest =
  (method: string) =>
  async (props?: AddRemoveProps | EditProps): Promise<string[]> => {
    try {
      return await (
        await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=${apiKey}`,
          {
            method,
            headers: {
              "User-Agent": "request",
              "Content-Type": "application/json",
            },
          }
        )
      ).json();
    } catch (e) {
      throw new Error(`Tickers Error: ${e}`);
    }
  };

export const getInitialTickers = createAsyncThunk(
  "tickers/load",
  tickersRequest("GET")
);
