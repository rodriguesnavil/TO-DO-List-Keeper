if(process.env.NODE_ENV ==='production'){
  
  module.exports = {mongodbURI:
  'mongodb://tododb:1qwerty@ds229732.mlab.com:29732/todo-prod'
  }
}else{
  module.exports = {mongodbURI:
  'mongodb://localhost/todo-db'}
}