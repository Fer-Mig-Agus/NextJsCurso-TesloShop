import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Hola mundo</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo</h1>

    </div>
  );
}


/**
 * 
 *  boton de request scraper: dominios, listado de scraper
 *  detalle del scraper: scraperapi
 * over view: los graficos
 *            los creditos? como mostrarlos?
 * 
 * 
 */