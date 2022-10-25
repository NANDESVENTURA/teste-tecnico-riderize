# toRiderise 

## Sobre
Esta api é uma api de cadastro de passeio, com o objetivo de criar os passeios, possibilidade de se cadastrar em passeios de terceiros também. 
<br>

## Requisitos
- [x] Criar os pedais.

- [x] Os pedais deverão ser exibidos para que o usuários possam se inscrever.

- [x] A API deverá ser construída usando o GraphQL.

- [x] Os dados deverão persistir em algum DB.



## Começando
- Primeiramente, instale as dependências utilizando ```yarn install``` , depende do gerenciador de pacotes de sua preferência
- Antes de começar dever ter:
    - Uma conexão Postgress, nessa aplicação foi utilizado o Prisma.   
- Criar um arquivo ```.env``` para armezenzar dados sensiveis a aplicação, como o secret para o token e a conexão postgress
```.env
SECRET=<chave md5 usada no JWT>
DATABASE_URL=<String de conexão>
```
Com essas variáveis de ambiente configuradas podemos executar nossa aplicação. 

## Executando
Para a execução foram criados alguns scripts dentro da aplicação
- dev-server : Execute  o comando ```yarn dev:server``` para executar a aplicação com o nodemon para desenvolvimento, ele vai recarregar a aplicação sempre que uma nova mudança for salva.

- graph: Execute o comando ```yarn graph```  para executar o servidor GraphQL utilizando o nodemon.

- Para criar as migrations no banco execute o comando ```yarn prisma generate``` em seguide o comando ```yarn prisma migrate dev --name <nome pra sua migration>```.

As querys dispostas pela API são:
- ```getSubscribers(ride_id: ID): [Subscription]``` : Retorna as inscrições feitas na Pedalada
- ```getSubscribersComplete(user_id: ID): [Ride]```: Retorna as pedaladas que o usuário esteve inscrito.
- ```getRideCreatedByUser(user_id: ID): [Ride]```: Retorna as pedaladas criadas pelo usuário
- ```createRide :Ride``` : Cria uma pedalada.
- ```signIn: User``` : Cria um usuário.
- ```signUp: Session``` : Login de usuário. Retornar o usuário e o token.


## Autor
*Ernandes Ventura Silva Neto*

[![Linkedin Badge](https://img.shields.io/badge/-Ernandes%20Ventura-6633cc?style=flat-square&logo=Linkedin&logoColor=black&link=https://www.linkedin.com/in/guilherme-ventura-703612150/)](https://www.linkedin.com/in/ernandes-ventura-892a88119/)