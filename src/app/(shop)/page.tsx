import { titleFont } from "@/config/fonts";
import Image from "next/image";
import { Title } from '@/components';

export default function Home() {
  return (
    <div>

      <Title 
      title='Store'
      subtitle="All products"
      className="mb-2"
      />
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