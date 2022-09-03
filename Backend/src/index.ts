import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { createClient } from 'redis';
import axios from 'axios';

const SERVER_PORT = 3000;

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    //express是后端node.js的框架，它可以作为server绑定一些端口，运行在服务器上，提供http的服务
    app.use(bodyParser.json());
    //this is a middleware, 把发送的请求变成json格式，转为object，便于提取http请求的数据

    // app.use('/', routes)
    //包含一个网址，这个网址的响应参数包含request, response, 这就是api入口
    // response.send()响应前端的请求
    // app.use('/', (request, response) => {
    //     console.log('received request:', request.params, request.query, request.body)
    //     response.send('hi')
    // })
    // request.params 是存在路由里面的参数
    // request.query 通过网址，问号传递的参数存在这里面
    // request.body post请求带的参数存在body里

    app.use('/', routes);

    app.listen(SERVER_PORT);
    //端口号，http的默认端口号为80，可以省略

    // insert new users for test
    console.log(
      `Express server has started on port ${SERVER_PORT}. Open http://localhost:${SERVER_PORT} to see results`
    );
  })
  .catch(error => console.log(error));
