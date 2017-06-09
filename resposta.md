>  Desenvolvido um serviço rest com as seguintes tecnologias:
* [node.js] - javascript runtime for backend 
* [express] - fast node.js network app framework
* [mongoose] - mongodb object modeling
* [redis] - in memory data structure store

#### 1. Estrutura de dados

1.1 MongoDB

* Vantagens
    * Formato BSON facilita o armazenamento dos dados na estrutura do JSON.
    * Estrutura de dados flexível.
* Desvantagens
    * Controle rígido no lado da aplicação (relacionamentos).

    ver pasta : `/app/models/schemas`

1.2 Redis

* Vantagens
    * Acesso aos dados é realizado de forma ágil. (chave-valor)
* Desvantagens
    * Não permite operações especiais (joins SQL e aninhamento de dados).

    ver pasta : `/app/models/schemas`


#### 2. Filtro e Validação

Foi criado um middleware para as requisições (schema_validator) que faz as validações com base nos schemas antes do acesso real aos dados.

```js
// app/controllers/products.js
// exemplo:

  app.post("/products", schema_validator({ body: sch_productlist }), function (req, res) {
        crud = getCrudStrategy();
        crud.add(req, res);
    });

```
#### 3. Falhas temporárias e permanentes

Uma idéia seria implementar um cluster (como exemplo abaixo) usando a lib de cluster do node que ja tem um sistema fácil de controle de clusters 'derrubados'

```js
var cluster = require('cluster');
var os = require('os');
var cpus = os.cpus();

if (cluster.isMaster) {
    // abre um node filho para cada cpu
    cpus.forEach(function () {
        cluster.fork();
    });

    cluster.on('listening', function (worker) {
        console.log('cluster %d conectado ', worker.process.pid);
    });
    
    cluster.on('exit', worker => {
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork(); //inicia novo node
    });

} else {    
    console.log("Worker " + process.pid + " iniciado");
    //slave sobe o server
    require('../server');
}
```

### Executando o projeto

#### Requisitos

- Install [Docker](http://docs.docker.com/linux/started/)
- Install [Docker Compose](https://docs.docker.com/compose/install/) (instale usando python pip)

#### Dicas
 * Trocar storage type no arquivo '/app/server.js'
```js
  //define storage for use : MONGO or REDIS
  require('../app/config/storage').setStorage("REDIS");
```

#### Executar o projeto
```sh
$ docker-compose up -d
```

[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[mongodb]: <https://www.mongodb.com/>
[mongoose]: <http://mongoosejs.com/>
[redis]: <https://redis.io/>