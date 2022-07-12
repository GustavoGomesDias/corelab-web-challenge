# Front-Enders

**[Link para o repo do backend](https://github.com/GustavoGomesDias/corelab-api-challenge)**

Visando contemplar tudo que o desafio pedia, foi desenvolvido um CRUD completo de veículos, uma possibilidade de buscar usando uma barra de pesquisa, favoritar e filtrar (a filtragem não testada, então acredito que ela não tá 100%).

## Começando pelo CRUD
Para adicionar um novo veículo, clicamos no botão abaixo:
![image](https://user-images.githubusercontent.com/61890060/178377899-2fd6fda3-1009-4074-b6f5-7a9cf2283907.png)

Logo em seguida, será aberto um modal contendo um form para criar o veículo:
![image](https://user-images.githubusercontent.com/61890060/178377971-baa163ef-c9d9-4eb6-bef5-d91452f69a8e.png)

Existem algumas validações aqui. Primeiro, a cor tem que ser hexadecimal ou, caso queira escrever o nome literal (vermelho, por exemplo), é necessário que exista dentro do CSS. (No caso do exemplo, poderiamos usar ou o hexdecimal de vermelho ou o nome "red").

A validação da cor é feita usando duas funções, uma que contém uma lista das cores com nome literal em CSS e outra que testa se a entradad é um hexdecimal válido:

*[src/util/validations.ts]*
```ts
export const isHexColor = (color: string) => {
  const reg =/^#([0-9a-f]{6}){1,2}$/i;

  return reg.test(color);
}

export const isValidColor = (color: string): boolean => {
  return isHexColor(color) || colorNameToHex(color) !== '';
}
```
*[src/util/helpers.ts]* - Olha se o nome da cor existe dentro da propriedade CSS
```ts
export const colorNameToHex = (color: string): string => {
    var colors: { [key: string]: string } = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colors[color.toLowerCase()] !== 'undefined') return colors[color.toLowerCase()];

    return '';
}
```

Outras validaçções importantes é a de **plate** e de **year**. Plate é obrigatório ser no formato 3 Letras + 4 Números (ABC1234) e Year tem que ser maior que 1900 (por que? ah, não sei).

A edição é feita do mesmo jeito, sendo que ao invés de abrir um form vazio, já se é puxado toda a informação do Veículo.

A deleção e leitura tem um certo controle, pois é atualizado em tempo real, sem que a página sofra reload. Ele é controlado por Context, o VehicleControlContext.

O VehicleControlContext é divido em 3 partes, o Provider, o Context e um Reducer bem grande. Não sei se vale apena copiar e colar o código dessa parte aqui, então vou enumerar as ações e funções desses Context

*[src/context/control/vehicle]*

Vou usar a interface que define o Context para explicar:
```ts
export interface VehicleControlContextProps {
  allVehicles: IVehicle[]
  favorites: IVehicle[]
  searchResultVehicles: IVehicle[]
  filterResultVehicles: IVehicle[]

  handleAddAllVehicles(): Promise<void>
  handleRemoveVehicle(id: string): Promise<void>

  handleAddVehicleInFavorites(vehicle: IVehicle): Promise<void>
  handleRemoveVehicleFromFavorites(vehicle: IVehicle): Promise<void>

  handleAddVehiclesInSearchList(info: string): void
  handleClearSearchList(): void

  handleAddVehiclesInFilterList(filterInfo: FilterInfo): void
  handleClearFilterList(): void
}
```
- allVehicles: Contém todos os veículos
- favorites: Contém os veículos favoritos
- searchResultVehicle: Contém os veículos vindo do resultado da busca feita usando o input de pesquisa
- filterResultVehicle: Contém os veículos encontrados usando o filter

- handleAddAllVehicles: Chama o backend e pega todos os veículos salvos no banco
- handleRemoveVehicle: Remove o veículo no banco de dados e nas listas em exibição no frontend (sem reload)
- handleAddVehicleInFavorites: Adiciona um veículo como favorito tanto no backend quanto no frontend
- handleRemoveVehicleFromFavorites: Remove o veículo de favorito no backend e no frontend
- handleAddVehiclesInSearchList: É quem de fato faz a pesquisa com a informação do search input e retorna a lista com os resultados
- handleClearSearchList: Limpa a lista searchResultVehicle
- handleAddVehiclesInFilterList: Faz o mesmo que handleAddVehiclesInSearchList, mas para os resultados do filtro
- handleClearFilterList: Limpa a filterResultVehicle

- Card de veículo:
![image](https://user-images.githubusercontent.com/61890060/178381634-5a483a48-d8c0-4e08-a93e-ba76538a5f15.png)

- Favorito:
![image](https://user-images.githubusercontent.com/61890060/178381679-4817ffcc-379e-4535-ab4a-3f5fe54e84fb.png)

- Form de edição (por algum motivo que eu não consegui identificar, o input tá como se fosse o input da barra de pesquisa)
![image](https://user-images.githubusercontent.com/61890060/178381912-293a0108-f9b5-4e77-8597-37cc3ed44b1d.png)


## Cards de veículos
Eles tem a cor do veículo e a cor da fonte e definido pelo brilho da cor do card; se for muito escuro, a fonte fica como branca; muito claro, a cor da fonte fica como preta.

Os cards tão dentro de uma GRID que para telas muito grandes ficam com 4 cards em cada linha, para telas grande ficam com 3 e para mobile fica com 1 ~ 2.
![image](https://user-images.githubusercontent.com/61890060/178383995-857a05ae-5a7a-4ec9-8e7f-6c98b11542a4.png)

![image](https://user-images.githubusercontent.com/61890060/178384158-ea530ab4-f83c-4075-b523-6b04ae175203.png)


## Tecnologias

Além do que já tinha no próprio projeto, eu adicionei apenas uma lib de ícones chamada react-icons.

Para calls com o backend, useo o fetch mesmo:

```ts
import { FetchAPIHeader, FetchReturns } from "../../types/fetch";

export default class FetchAPI<T> {
  private readonly apiURL: string;

  private headers: FetchAPIHeader;

  constructor(apiURL: string) {
    this.apiURL = apiURL;

    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async get(complementUrl: string): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'GET',
      headers: { ...this.headers },
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async getWithBody(complementUrl: string, info: unknown): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async post(complementUrl: string, info: any): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async delete(complementUrl: string): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'DELETE',
      headers: { ...this.headers },
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async put(complementUrl: string, info: any): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'PUT',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  getHeader(): FetchAPIHeader {
    return this.headers;
  }
}

export interface FetchReturns<T> {
  statusCode: number
  data: T
}

export interface FetchAPIHeader {
  'Content-Type': string
  Accept: string
}

export interface HttpResponse {
  message?: string
  error?: string
  content?: Record<any, any>
}
```

## Adicionais
Algo que eu queria deixar registrado pelo menos é o Toast que eu fiz e os Loaders, que junto do hook para o controle de veículos, foram os meus 3 custom hooks desse projeto.

