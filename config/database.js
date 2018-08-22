if(process.env.NODE_ENV ==='production'){
  
  module.exports = {mongodbURI:
  'mongodb://navil:navil@123.mlab.com:29732/todo-prod'
  }
}else{
  module.exports = {mongodbURI:
  'mongodb://localhost/todo-db'}
}