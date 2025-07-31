import { Films } from 'swapi-ts'

const FilmDetailRoot = () => {
  console.log(Films.getPage())
  return <div>Film Detail Root Component</div>
}

export default FilmDetailRoot
