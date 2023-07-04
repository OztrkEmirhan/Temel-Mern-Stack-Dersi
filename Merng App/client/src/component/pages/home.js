import Egitmen from "../egitmen"
import EgitmenEkle from "../egitmenEkle"
import Kurslar from "../kurslar"
import KursEkle from "../kursEkle"

export default function home() {
  return     <>
    <KursEkle />
    <Kurslar />
    <hr />
    <EgitmenEkle />
    <Egitmen />
</>
}
