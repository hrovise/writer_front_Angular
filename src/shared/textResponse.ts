import { IChunk } from "./chunk";

export interface ITextResponse{
       chunks: IChunk[];
  totalLengthText: number;
  chunksCount: number;
  title: string;
  genre: string;
}


