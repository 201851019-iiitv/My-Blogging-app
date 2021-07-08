const PATH='./data.json'
const fs=require('fs');

class Post{

getlist(){
    //getlist of all post
return this.readdata();

}

getIndividual(post_id){
    // get  details of single post

    //console.log(post_id);

    // TODO : remove for loop
      let allpost=this.readdata();
     for(let val=0;val<allpost.length;val++){
          if(allpost[val]['id']==post_id){     //  * ==
              return allpost[val];
          }
      
     }

     
}


addnewpost(newdata){
    // add new post
    let currdata=this.readdata();
    currdata.unshift(newdata);
    //console.log(currdata);
    this.storeData(currdata);
}

readdata(){
  
   let rawdata=fs.readFileSync(PATH, 'utf8');
   let allposts=JSON.parse(rawdata);
  return allposts;
}

storeData(newdata){
let rawdata=JSON.stringify(newdata);
fs.writeFileSync(PATH,rawdata);

}


}



module.exports=Post;