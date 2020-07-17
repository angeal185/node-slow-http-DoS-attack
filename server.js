
  stream.on('timeout', function(err){
    console.log('timeout')

  });

  stream.on('close', function(err){
    console.log('closed')

  });

  stream.on('error', function(err){
    console.log(err)

  });

  stream.end('<h1>Hello World</h1>');

});


server.listen(8080, function(){
  console.log('server listening at port:8080')
})
