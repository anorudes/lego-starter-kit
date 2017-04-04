// Message.getRole(userId) -> owner
// Message.is('owner')  // ?
// Message.roles = {
//  owner: {
//    read: ['title', 'createdAt'], // all
//    write: ['user, 'owner'] // info
// }
//  guest: {
//    read: ['title', 'createdAt'], // all
//    write: ['user, 'owner'] // null
// }
// validate params
// 1) OWNER
// 2) Public
//
//
// Message.isOwner = (userId) => { this.ownerId } ['content']
// Message.canWrite = ['content']
// MEssage.canWrite = ['content']
//
// schema = {
//   title: {
//     canWrite: () => {}
//   }
// }


import getModels from './models';
import _ from 'lodash';
export default (ctx) => {
  return class ChatModule {
    getApi() {
      console.log(1111);
      const api = ctx.asyncRouter();
      const { isAuth } = ctx.middlewares;
      const { createResourse, wrapResourse } = ctx.helpers;
      const { Chat, Message } = this;
      api.get('/', () => { test: true; });
      // api.get('/message/:subjectType/:subjectId', isAuth, async (req) => {
      //   const params = req.allParams();
      //   return Message.find({
      //     subjectType: params.subjectType,
      //     subjectId: params.subjectId,
      //   }); // order populate sort
      // });
      // console.log(2222);
      // api.post('/message', async (req) => {
      //   const params = req.allParams();
      //   const userId = req.user._id;
      //   params.user = userId;
      //   const message = new Message(params);
      //   await message.save();
      //   this
      //   .emit(
      //     this.getRoomName(params.subjectType, params.subjectId),
      //     await Message.populate(message, 'user'),
      //   );
      //   return message;
      // });
      // console.log(3333);
      // api.put('/message/:id', isAuth, async (req) => {
      //   const params = req.allParams();
      //   const comment = await Message
      //   .findById(params.id)
      //   .then(ctx.helpers._checkNotFound('Comment'));
      //   // check owner
      //   // validate params
      //   // Message.setState(params)
      //   Object.assign(comment, params);
      //   return comment.save();
      // }); // Изменить комментарий
      // console.log(4444);
      // api.delete('/message/:id', isAuth, async (req) => {
      //   const params = req.allParams();
      //   const comment = await Message
      //   .findById(params.id)
      //   .then(ctx.helpers._checkNotFound('Comment'));
      //   // check owner
      //   return comment.remove();
      // }); // Изменить комментарий
      // console.log(5555);
      // api.use('/chat', wrapResourse(createResourse(Chat)));
      // api.use('/message', wrapResourse(createResourse(Message)));
      // this.useMiddlewares();
      return api;
    }
    // useMiddlewares() { // @TODO: isuvorov
    //   const middlewares = _.flattenDeep(ctx.getUsingMiddlewares());
    //   middlewares.forEach((middleware) => {
    //     middleware && typeof middleware === 'function' && this.api.use(middleware);
    //   });
    // }
    runApi() {
      // const api = this.getApi();


      ctx.app.use(() => {
          console.log(12312313123123);
      });
      console.log(1111);
      const api = ctx.asyncRouter();
      console.log(2222);
      api.get('/test', async () => {
        console.log('get');
        return { fuck: 'you' };
      });
      console.log(33333);
      ctx.app.use('/api/module', api);
      console.log(4444);
    }
    // getRoomName(subjectType, subjectId) {
    //   return `subject_${subjectType}_subjectId_${subjectId}`;
    // }
    // emit(room, message, emitAction = 'message') {
    //   console.log(`Шлю ${message.content} в ${room}`);
    //   return this.namespace.to(room).emit(emitAction, message);
    // }
    // async runSockets() {
    //   const { Message } = this;
    //   // create namespace
    //   // this.namespace = ctx.io.namespace('/api/module/chat/comments')
    //   // .on('connection', async (socket) => {
    //   //
    //   // })
    //   // .on('disconnection', async (socket) => {
    //   //
    //   // });
    //
    //
    //   // const socket = ctx.io.getSocket('/api/module/chat/comments');
    //
    //   // bug fix
    //   this.namespace = ctx.io.of('/api/module/chat/comments').on('connection', async (socket) => {
    //     const { subjectType, subjectId } = socket.data;
    //     const roomName = this.getRoomName(subjectType, subjectId);
    //     // console.log('socket connected', socket.user._id);
    //     socket.join(`user_${socket.user.id}`);
    //     socket.join(roomName);
    //     socket.on('message', async (data) => {
    //       const message = new Message({
    //         ...data,
    //         subjectType,
    //         subjectId,
    //         user: socket.user._id,
    //       });
    //       await message.save();
    //       await Message.populate(message, 'user');
    //       // console.log(message);
    //       // console.log(`Шлю в комнату ${roomName} сообщение ${message.content}`);
    //       return this.emit(roomName, message);
    //     });
    //   });
    //   // middleware
    //   this.namespace.use((socket, next) => {
    //     const { query } = socket.handshake;
    //     const req = socket.request;
    //     const res = req.res;
    //     if (!req.query) {
    //       req.query = {};
    //     }
    //     Object.assign(req.query, query);
    //     const { parseToken } = ctx.middlewares;
    //     parseToken(req, res, next);
    //   });
    //   // // other middlewares
    //   ctx.io.atachMiddlwares(this.namespace);
    // }
    async init() {
      return null;
      // const models = getModels(ctx);
      // this.Chat = models.Chat;
      // this.Message = models.Message;
    }
    async run() {
      this.runApi();
      // await this.runSockets();
      return true;
    }
  };
};
