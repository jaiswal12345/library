var Book = require('../models/book.model');
function BookCtrl(){    
    this.get = function(req,res){
        var count;
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;
        //deferred execution:
        var query = Book.find().skip(pageIndex*pageSize).limit(pageSize);
        var count;
        Book.count().exec()
        .then(function(result){
            count = result;
            return query.exec()
        .then(function(book){  
                var meta = {
                    totalRecords : count,
                    totalPages : Math.ceil(count/pageSize)
                };
                var response = {
                    metaData : meta,
                    book : book
                };
                res.status(200);
                res.json(response);
            }).catch(function(error){
                res.status(500);
                 res.json({
                    message : "Internal Server Error",
                    status : "500"
                });
            });         
        })
    };

    //insert
    this.save = function(req,res){
        var book = new Book(req.body);
        book.save(function(err,result){
            if(err){
                res.status(500);
                res.json({
                    message : "Internal Server Error",
                    status : "500"
                });
            }
            else{
                res.status(201);
                res.json({
                    message : "saved successfully",
                    status : "201"
                });
            }
        });
   };

   this.put = function(req,res){
    var id = req.params.id;
    Book.findByIdAndUpdate(id,req.body,function(err,result){
        if (err){
         res.status(500);
         res.json({
                    message : "Internal Server Error",
                    status : "500"
                });
        } else{
         res.status(200);//deleted
         res.json({
                    message : "updated successfully",
                    status : "201"
                });
        }
    });   
 };
   //delete function
   this.delete = function(req,res){
       var id = req.params.id;
       Book.findByIdAndRemove(id,function(err,result){
           if (err){
            res.status(500);
            res.json({
                    message : "Internal Server Error",
                    status : "500"
                });
           } else{
            res.status(204);//deleted
             res.json({
                    message : "deleted successfully",
                    status : "201"
                });
           }
       });   
    };
}
module.exports = new BookCtrl();